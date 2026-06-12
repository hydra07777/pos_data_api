// ============================================================
// Preset themes controller
// ============================================================
const { PresetTheme } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (_req, res) => {
    const rows = await PresetTheme.findAll({ order: [['name', 'ASC']] });
    return ok(res, rows);
});

exports.create = asyncH(async (req, res) => {
    const { name, primaryColor, secondaryColor } = req.body;
    if (!name || !primaryColor || !secondaryColor)
        throw HttpError.badRequest('name, primaryColor and secondaryColor are required');
    const row = await PresetTheme.create({ name, primaryColor, secondaryColor });
    return created(res, row);
});

exports.remove = asyncH(async (req, res) => {
    const row = await PresetTheme.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Theme not found');
    await row.destroy();
    return noContent(res);
});
