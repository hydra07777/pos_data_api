const { Op } = require('sequelize');
const {
    Order, OrderItem, Product, ProductSize, Payment, Customer, Cashier, DashboardLog, PlatformSetting,
} = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');
const { computeTotals } = require('../utils/pricing');
const { generate: generateOrderNumber } = require('../utils/orderNumber');
const env = require('../config/env');

// Create an order in "pending" state (cart submitted)
exports.create = asyncH(async (req, res) => {
    const { items, customerId, currency = 'USD' } = req.body;
    if (!Array.isArray(items) || items.length === 0)
        throw HttpError.badRequest('items must be a non-empty array');

    const cashierId = req.cashier ? req.cashier.id : req.body.cashierId;
    if (!cashierId) throw HttpError.badRequest('cashierId is required');

    const built = await buildItems(items);
    const totals = computeTotals({ items: built, fxRate: env.business.fxRate });

    const order = await Order.create({
        orderNumber: await generateOrderNumber(Order),
        cashierId,
        customerId: customerId || null,
        status: 'pending',
        currency,
        ...totals,
    });

    await OrderItem.bulkCreate(
        built.map((it, i) => ({ ...it, orderId: order.id, position: i }))
    );

    await DashboardLog.create({
        type: 'order_placed',
        label: `Order ${order.orderNumber}`,
        amount: totals.totalAmount,
        refId: order.id,
        cashierId,
    });

    const full = await Order.findByPk(order.id, {
        include: [
            {
                model: OrderItem, as: 'items', include: [
                    { model: Product, as: 'product' },
                    { model: ProductSize, as: 'size' },
                ]
            },
            { model: Customer, as: 'customer' },
            { model: Cashier, as: 'cashier' },
        ],
    });
    return created(res, full);
});

exports.list = asyncH(async (req, res) => {
    const { status, cashierId, from, to, page = 1, limit = 50 } = req.query;
    const where = {};
    if (status) where.status = status;
    if (cashierId) where.cashierId = cashierId;
    if (from || to) {
        // The model defines `createdAt: 'created_at'` (snake_case in DB).
        // Filtering with the JS attribute name `createdAt` is not translated
        // to the actual column in `findAndCountAll`'s count subquery, which
        // raised "Unknown column 'Order.createdAt'". Using the raw column
        // name (as already done in dashboard/stockMovements controllers) works.
        where.created_at = {};
        if (from) where.created_at[Op.gte] = new Date(from);
        if (to) where.created_at[Op.lte] = new Date(to);
    }
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { count, rows } = await Order.findAndCountAll({
        where,
        include: [
            {
                model: OrderItem,
                as: 'items',
                include: [
                    { model: Product, as: 'product' },
                    { model: ProductSize, as: 'size' },
                ],
            },
            { model: Payment, as: 'payment' },
            { model: Cashier, as: 'cashier', attributes: ['id', 'code', 'fullName'] },
        ],
        order: [['created_at', 'DESC']],
        limit: parseInt(limit, 10),
        offset,
    });
    return res.json({
        success: true,
        data: rows,
        meta: { total: count, page: parseInt(page, 10), limit: parseInt(limit, 10) },
    });
});

exports.getOne = asyncH(async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
        include: [
            {
                model: OrderItem, as: 'items', include: [
                    { model: Product, as: 'product' },
                    { model: ProductSize, as: 'size' },
                ]
            },
            { model: Payment, as: 'payment' },
            { model: Cashier, as: 'cashier' },
            { model: Customer, as: 'customer' },
        ],
    });
    if (!order) throw HttpError.notFound('Order not found');
    return ok(res, order);
});

// Mark order as PAID, decrement stock, create a Payment row
exports.pay = asyncH(async (req, res) => {
    const { method, amount, reference } = req.body;
    if (!['cash', 'card', 'mobile', 'other'].includes(method))
        throw HttpError.badRequest('method must be cash, card, mobile or other');
    if (!Number.isFinite(+amount) || +amount <= 0)
        throw HttpError.badRequest('amount must be a positive number');

    const order = await Order.findByPk(req.params.id, { include: [{ model: OrderItem, as: 'items' }] });
    if (!order) throw HttpError.notFound('Order not found');
    if (order.status === 'paid') throw HttpError.conflict('Order already paid');
    if (order.status === 'cancelled') throw HttpError.conflict('Order was cancelled');

    // ── Invoice quota check ──────────────────────────────────
    // Before marking the order as paid (which generates a printable
    // invoice), verify that the platform-wide invoice quota has not
    // been reached. If the quota is disabled, skip the check.
    const quotaRow = await PlatformSetting.findOne({ where: { key: 'invoice_quota' } });
    const enabledRow = await PlatformSetting.findOne({ where: { key: 'quota_enabled' } });
    const quotaEnabled = enabledRow ? enabledRow.value === 'true' : true;
    if (quotaEnabled && quotaRow) {
        const quota = parseInt(quotaRow.value, 10);
        if (Number.isFinite(quota) && quota > 0) {
            const paidCount = await Order.count({ where: { status: 'paid' } });
            if (paidCount >= quota) {
                throw HttpError.forbidden(
                    `Quota de factures atteint (${paidCount}/${quota}). ` +
                    `Contactez l'administrateur pour augmenter le quota.`
                );
            }
        }
    }
    // ── End quota check ───────────────────────────────────────

    // Decrement stock + record movements
    for (const it of order.items) {
        const product = await Product.findByPk(it.productId);
        if (!product) continue;
        const newStock = Math.max(0, product.stockQuantity - it.quantity);
        await product.update({ stockQuantity: newStock });
        await order.constructor.sequelize.models.StockMovement.create({
            productId: product.id,
            type: 'out',
            quantity: -it.quantity,
            reason: `Vente ${order.orderNumber}`,
            userId: order.cashierId,
        });
    }

    await Payment.create({
        orderId: order.id, method, amount, reference: reference || null,
    });
    await order.update({ status: 'paid', paidAt: new Date() });

    await DashboardLog.create({
        type: 'payment_received',
        label: `Payment ${order.orderNumber}`,
        amount, refId: order.id, cashierId: order.cashierId,
    });

    const full = await Order.findByPk(order.id, {
        include: [
            {
                model: OrderItem, as: 'items', include: [
                    { model: Product, as: 'product' },
                    { model: ProductSize, as: 'size' },
                ]
            },
            { model: Payment, as: 'payment' },
            { model: Cashier, as: 'cashier' },
            { model: Customer, as: 'customer' },
        ],
    });
    return ok(res, full);
});

exports.refund = asyncH(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) throw HttpError.notFound('Order not found');
    if (order.status !== 'paid') throw HttpError.conflict('Only paid orders can be refunded');
    await order.update({ status: 'refunded' });
    await DashboardLog.create({
        type: 'refund', label: `Refund ${order.orderNumber}`,
        amount: -order.totalAmount, refId: order.id, cashierId: order.cashierId,
    });
    return ok(res, order);
});

exports.cancel = asyncH(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) throw HttpError.notFound('Order not found');
    if (order.status === 'paid') throw HttpError.conflict('Cannot cancel a paid order');
    await order.update({ status: 'cancelled' });
    return ok(res, order);
});

exports.remove = asyncH(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) throw HttpError.notFound('Order not found');
    if (order.status === 'paid') throw HttpError.conflict('Cannot delete a paid order');
    await order.destroy();
    return noContent(res);
});

// ---------------- helpers ----------------
async function buildItems(rawItems) {
    const built = [];
    for (const raw of rawItems) {
        const product = await Product.findByPk(raw.productId);
        if (!product) throw HttpError.badRequest(`Product ${raw.productId} not found`);
        if (!product.isActive) throw HttpError.badRequest(`Product ${product.name} is inactive`);
        if (!Number.isFinite(+raw.quantity) || +raw.quantity <= 0)
            throw HttpError.badRequest('quantity must be > 0');

        let unitPrice = parseFloat(product.price);
        let size = null;
        if (raw.sizeId) {
            size = await ProductSize.findByPk(raw.sizeId);
            if (!size || size.productId !== product.id)
                throw HttpError.badRequest(`Invalid size ${raw.sizeId}`);
            unitPrice += parseFloat(size.priceExtra || 0);
        }
        const quantity = +raw.quantity;
        built.push({
            productId: product.id,
            sizeId: size ? size.id : null,
            quantity,
            unitPrice,
            lineTotal: Math.round(unitPrice * quantity * 100) / 100,
        });
    }
    return built;
}
