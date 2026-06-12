// ============================================================
// Cashiers controller
// ============================================================
const { Op } = require('sequelize');
const { Cashier } = require('../models');
const HttpError = require('../utils/httpError');
const { ok, created, noContent } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

exports.list = asyncH(async (req, res) => {
    const { q, role, includeInactive } = req.query;
    const where = {};
    if (!includeInactive) where.isActive = true;
    if (role) where.role = role;
    if (q) where[Op.or] = [
        { fullName: { [Op.like]: `%${q}%` } },
        { code: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
    ];
    const rows = await Cashier.findAll({ where, order: [['fullName', 'ASC']] });
    return ok(res, rows);
});

exports.getOne = asyncH(async (req, res) => {
    const row = await Cashier.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Cashier not found');
    return ok(res, row);
});

exports.create = asyncH(async (req, res) => {
    const { code, fullName, email, phone, role, avatarUrl, password } = req.body;
    if (!code || !fullName) throw HttpError.badRequest('code and fullName are required');
    const passwordHash = password ? Cashier.hashPassword(password) : null;
    const row = await Cashier.create({
        code, fullName, email, phone, role, avatarUrl, passwordHash,
    });
    return created(res, row);
});

exports.update = asyncH(async (req, res) => {
    const row = await Cashier.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Cashier not found');
    const { password, ...rest } = req.body;
    await row.update({
        ...rest,
        ...(password ? { passwordHash: Cashier.hashPassword(password) } : {}),
    });
    return ok(res, row);
});

exports.remove = asyncH(async (req, res) => {
    const row = await Cashier.findByPk(req.params.id);
    if (!row) throw HttpError.notFound('Cashier not found');
    await row.destroy();
    return noContent(res);
});

exports.login = asyncH(async (req, res) => {
    const { code, password } = req.body;
    if (!code || !password) throw HttpError.badRequest('code and password are required');
    const row = await Cashier.findOne({ where: { code, isActive: true } });
    if (!row || !row.verifyPassword(password)) throw HttpError.unauthorized('Invalid credentials');
    return ok(res, { cashier: row, token: `static-token-${row.id}` });
});
