// ============================================================
// FxRates controller — historical USD -> FC rates
// ============================================================
const { Op } = require('sequelize');
const { FxRate } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const { code = 'USD' } = req.query;
    const rows = await FxRate.findAll({
        where: { code },
        order: [['effective_at', 'DESC']],
    });
    return ok(res, rows);
});

exports.current = asyncH(async (req, res) => {
    const { code = 'USD' } = req.query;
    const row = await FxRate.findOne({
        where: { code },
        order: [['effective_at', 'DESC']],
    });
    if (!row) throw HttpError.notFound(`No FX rate for ${code}`);
    return ok(res, row);
});

exports.create = asyncH(async (req, res) => {
    const { code = 'USD', rateToFc, effectiveAt } = req.body;
    if (!Number.isFinite(+rateToFc) || +rateToFc <= 0)
        throw HttpError.badRequest('rateToFc must be a positive number');
    const row = await FxRate.create({ code, rateToFc, effectiveAt: effectiveAt || new Date() });
    return created(res, row);
});

exports.remove = asyncH(async (req, res) => {
    const row = await FxRate.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('FX rate not found');
    await row.destroy();
    return noContent(res);
});
