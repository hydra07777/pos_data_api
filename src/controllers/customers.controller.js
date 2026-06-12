// ============================================================
// Customers controller
// ============================================================
const { Op } = require('sequelize');
const { Customer } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const { q, type } = req.query;
    const where = {};
    if (type) where.type = type;
    if (q) where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { phone: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
    ];
    const rows = await Customer.findAll({ where, order: [['name', 'ASC']] });
    return ok(res, rows);
});

exports.getOne = asyncH(async (req, res) => {
    const row = await Customer.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Customer not found');
    return ok(res, row);
});

exports.create = asyncH(async (req, res) => {
    if (!req.body.name) throw HttpError.badRequest('name is required');
    const row = await Customer.create(req.body);
    return created(res, row);
});

exports.update = asyncH(async (req, res) => {
    const row = await Customer.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Customer not found');
    await row.update(req.body);
    return ok(res, row);
});

exports.remove = asyncH(async (req, res) => {
    const row = await Customer.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Customer not found');
    await row.destroy();
    return noContent(res);
});
