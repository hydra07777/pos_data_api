// ============================================================
// Stock controller (read-only) — uses /products/:id/stock
// ============================================================
const { Op } = require('sequelize');
const { Product } = require('../models');
const HttpError = require('../utils/httpError');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');
const env = require('../config/env');

exports.getStockByProduct = asyncH(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw HttpError.notFound('Product not found');
    return ok(res, {
        productId: product.id,
        name: product.name,
        stockQuantity: product.stockQuantity,
        isLow: product.stockQuantity <= env.business.lowStockThreshold,
    });
});

exports.listLowStock = asyncH(async (_req, res) => {
    const rows = await Product.findAll({
        where: { stockQuantity: { [Op.lte]: env.business.lowStockThreshold } },
        order: [['stockQuantity', 'ASC']],
    });
    return ok(res, rows);
});
