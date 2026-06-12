// ============================================================
// Stock movements controller (read-only)
// ============================================================
const { Op } = require('sequelize');
const { StockMovement, Product, Cashier } = require('../models');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const { productId, type, from, to, page = 1, limit = 50 } = req.query;
    const where = {};
    if (productId) where.productId = productId;
    if (type) where.type = type;
    if (from || to) {
        where.created_at = {};
        if (from) where.created_at[Op.gte] = new Date(from);
        if (to) where.created_at[Op.lte] = new Date(to);
    }
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const { count, rows } = await StockMovement.findAndCountAll({
        where,
        include: [
            { model: Product, as: 'product' },
            { model: Cashier, as: 'user' },
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
