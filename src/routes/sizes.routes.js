// ============================================================
// /api/sizes — top-level size lookup (rarely used; main routes
// for sizes are nested under /products/:productId/sizes)
// ============================================================
const router = require('express').Router();
const { ProductSize } = require('../models');
const asyncH = require('../utils/pick');
const { ok } = require('../utils/apiResponse');

router.get('/', asyncH(async (_req, res) => {
    const rows = await ProductSize.findAll({ order: [['productId', 'ASC']] });
    return ok(res, rows);
}));

module.exports = router;
