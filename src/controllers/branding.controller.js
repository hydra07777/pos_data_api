// ============================================================
// Branding controller — singleton (id=1)
// ============================================================
const { Branding } = require('../models');
const HttpError = require('../utils/httpError');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

const DEFAULTS = {
    companyName: 'BRIKIN',
    tagline: 'Specialty drinks & more',
    logoText: 'P',
    primaryColor: '#f6905f',
    secondaryColor: '#fdebe1',
    idNat: '01-G4701-N25076X',
    rccm: 'CD/KNG/RCCM/17-A-03542',
    taxNumber: 'A1720894F',
    address: '03 Avenue Mbiloa / Ngaliema',
    phone: '+243974763940 / 819648854',
    email: 'zuiya.mambula@gmail.com',
};

exports.get = asyncH(async (_req, res) => {
    let row = await Branding.findByPk(1);
    if (!row) row = await Branding.create({ ...DEFAULTS });
    return ok(res, row);
});

exports.update = asyncH(async (req, res) => {
    let row = await Branding.findByPk(1);
    if (!row) row = await Branding.create({ ...DEFAULTS, ...req.body });
    else await row.update(req.body);
    return ok(res, row);
});

exports.reset = asyncH(async (_req, res) => {
    let row = await Branding.findByPk(1);
    if (!row) row = await Branding.create({ ...DEFAULTS });
    else await row.update({ ...DEFAULTS });
    return ok(res, row);
});

// Exported for the seeder
exports.DEFAULTS = DEFAULTS;
