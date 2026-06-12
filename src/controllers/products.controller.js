// ============================================================
// Products controller
// ============================================================
const { Op } = require('sequelize');
const { Product, Category, ProductSize, StockMovement } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');
const env = require('../config/env');

exports.list = asyncH(async (req, res) => {
    const { q, category, page = 1, limit = 50, includeInactive } = req.query;
    const where = {};
    if (!includeInactive || includeInactive !== 'true') where.isActive = true;
    if (category) where.categoryId = category;
    if (q) where.name = { [Op.like]: `%${q}%` };

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { count, rows } = await Product.findAndCountAll({
        where,
        include: [
            { model: Category, as: 'category' },
            { model: ProductSize, as: 'sizes' },
        ],
        order: [['name', 'ASC']],
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
    const product = await Product.findByPk(req.params.id, {
        include: [
            { model: Category, as: 'category' },
            { model: ProductSize, as: 'sizes' },
        ],
    });
    if (!product) throw HttpError.notFound('Product not found');
    return ok(res, product);
});

exports.lowStock = asyncH(async (_req, res) => {
    const rows = await Product.findAll({
        where: { stockQuantity: { [Op.lte]: env.business.lowStockThreshold } },
        order: [['stockQuantity', 'ASC']],
    });
    return ok(res, rows);
});

exports.create = asyncH(async (req, res) => {
    const payload = sanitize(req.body);
    if (!payload.name) throw HttpError.badRequest('name is required');
    if (!payload.categoryId) throw HttpError.badRequest('categoryId is required');

    const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : [];
    const created_product = await Product.create(payload);
    if (sizes.length) {
        await ProductSize.bulkCreate(
            sizes.map((s) => ({
                productId: created_product.id,
                label: s.label,
                priceExtra: s.priceExtra || 0,
            }))
        );
    }
    const full = await Product.findByPk(created_product.id, { include: [{ model: ProductSize, as: 'sizes' }] });
    return created(res, full);
});

exports.update = asyncH(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw HttpError.notFound('Product not found');
    const payload = sanitize(req.body);
    await product.update(payload);

    if (Array.isArray(req.body.sizes)) {
        await ProductSize.destroy({ where: { productId: product.id } });
        if (req.body.sizes.length) {
            await ProductSize.bulkCreate(
                req.body.sizes.map((s) => ({
                    productId: product.id,
                    label: s.label,
                    priceExtra: s.priceExtra || 0,
                }))
            );
        }
    }

    const full = await Product.findByPk(product.id, { include: [{ model: ProductSize, as: 'sizes' }] });
    return ok(res, full);
});

exports.remove = asyncH(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw HttpError.notFound('Product not found');
    await product.destroy();
    return noContent(res);
});

// Adjust stock manually (in / out / adjustment)
exports.adjustStock = asyncH(async (req, res) => {
    const { type, quantity, reason } = req.body;
    if (!['in', 'out', 'adjustment'].includes(type))
        throw HttpError.badRequest('type must be in, out or adjustment');
    if (!Number.isFinite(+quantity) || +quantity === 0)
        throw HttpError.badRequest('quantity must be a non-zero number');

    const product = await Product.findByPk(req.params.id);
    if (!product) throw HttpError.notFound('Product not found');

    const delta = type === 'out' ? -Math.abs(+quantity) : +Math.abs(+quantity);
    await product.update({ stockQuantity: product.stockQuantity + delta });
    const movement = await StockMovement.create({
        productId: product.id,
        type,
        quantity: delta,
        reason: reason || `manual ${type}`,
        userId: req.cashier ? req.cashier.id : null,
    });
    return ok(res, { product, movement });
});

function sanitize(b = {}) {
    return {
        name: b.name,
        description: b.description,
        price: b.price,
        categoryId: b.categoryId,
        imageUrl: b.imageUrl || b.image_url,
        stockQuantity: b.stockQuantity ?? b.stock_quantity,
        popularity: b.popularity,
        isActive: b.isActive ?? b.is_active,
    };
}
