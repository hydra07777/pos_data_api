// ============================================================
// Payments controller
// ============================================================
const { Payment, Order } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const rows = await Payment.findAll({
        include: [{ model: Order, as: 'order' }],
        order: [['paid_at', 'DESC']],
    });
    return ok(res, rows);
});

exports.getOne = asyncH(async (req, res) => {
    const row = await Payment.findByPk(req.params.id, {
        include: [{ model: Order, as: 'order' }],
    });
    if (!row) throw HttpError.notFound('Payment not found');
    return ok(res, row);
});

exports.remove = asyncH(async (req, res) => {
    const row = await Payment.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Payment not found');
    await row.destroy();
    return noContent(res);
});
