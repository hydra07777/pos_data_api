// ============================================================
// Dashboard controller — analytics endpoints
// ============================================================
const { Op, fn, col, literal } = require('sequelize');
const { Order, OrderItem, Product, DashboardLog } = require('../models');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');
const env = require('../config/env');

// GET /dashboard/summary  -> { todaySales, todayOrders, topSellers, salesByDay }
exports.summary = asyncH(async (_req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const [paidToday, countToday, topSellers, last7] = await Promise.all([
        Order.sum('totalAmount', { where: { status: 'paid', created_at: { [Op.gte]: start } } }),
        Order.count({ where: { created_at: { [Op.gte]: start } } }),
        OrderItem.findAll({
            attributes: [
                'productId',
                [fn('SUM', col('OrderItem.quantity')), 'total_sold'],
                [fn('SUM', col('OrderItem.line_total')), 'revenue'],
            ],
            include: [
                { model: Product, as: 'product', attributes: ['id', 'name'] },
                { model: Order, as: 'order', attributes: [], where: { status: 'paid' } },
            ],
            group: ['productId', 'product.id', 'product.name'],
            order: [[literal('total_sold'), 'DESC']],
            limit: 10,
        }),
        Order.findAll({
            attributes: [
                [fn('DATE', col('created_at')), 'day'],
                [fn('COUNT', '*'), 'orders_count'],
                [fn('SUM', col('total_amount')), 'total'],
            ],
            where: { status: 'paid', created_at: { [Op.gte]: new Date(Date.now() - 6 * 24 * 3600 * 1000) } },
            group: [literal('day')],
            order: [literal('day')],
        }),
    ]);

    return ok(res, {
        todaySales: paidToday || 0,
        todayOrders: countToday,
        fxRate: env.business.fxRate,
        topSellers: topSellers.map((t) => ({
            productId: t.productId,
            name: t.product ? t.product.name : null,
            totalSold: parseInt(t.get('total_sold'), 10),
            revenue: parseFloat(t.get('revenue')),
        })),
        salesByDay: last7.map((r) => ({
            day: r.get('day'),
            ordersCount: parseInt(r.get('orders_count'), 10),
            total: parseFloat(r.get('total')),
        })),
    });
});

exports.recentActivity = asyncH(async (req, res) => {
    const { limit = 20 } = req.query;
    const rows = await DashboardLog.findAll({
        order: [['created_at', 'DESC']],
        limit: parseInt(limit, 10),
    });
    return ok(res, rows);
});
