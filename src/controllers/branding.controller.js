// ============================================================
// Branding controller — singleton (id=1)
// ============================================================
const { Branding, FxRate } = require('../models');
const HttpError = require('../utils/httpError');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

const DEFAULTS = {
    companyName: 'JOAC',
    tagline: 'Specialty drinks & more',
    logoText: 'J',
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

    // Include the current FX rate so the branding dialog can
    // display and edit it alongside the company info.
    const fx = await FxRate.findOne({
        where: { code: 'USD' },
        order: [['effective_at', 'DESC']],
    });

    return ok(res, {
        ...row.toJSON(),
        fxRate: fx ? parseFloat(fx.rateToFc) : null,
        fxRateId: fx ? fx.id : null,
    });
});

exports.update = asyncH(async (req, res) => {
    const { fxRate: fxRateValue, ...brandingFields } = req.body;

    let row = await Branding.findByPk(1);
    if (!row) row = await Branding.create({ ...DEFAULTS, ...brandingFields });
    else await row.update(brandingFields);

    // If a new FX rate was provided, insert a new row so the
    // rate history is preserved.
    let fx = null;
    if (fxRateValue !== undefined && fxRateValue !== null) {
        const rate = parseFloat(fxRateValue);
        if (!Number.isFinite(rate) || rate <= 0)
            throw HttpError.badRequest('fxRate must be a positive number');
        fx = await FxRate.create({
            code: 'USD',
            rateToFc: rate,
            effectiveAt: new Date(),
        });
    } else {
        fx = await FxRate.findOne({
            where: { code: 'USD' },
            order: [['effective_at', 'DESC']],
        });
    }

    return ok(res, {
        ...row.toJSON(),
        fxRate: fx ? parseFloat(fx.rateToFc) : null,
        fxRateId: fx ? fx.id : null,
    });
});

exports.reset = asyncH(async (_req, res) => {
    let row = await Branding.findByPk(1);
    if (!row) row = await Branding.create({ ...DEFAULTS });
    else await row.update({ ...DEFAULTS });

    const fx = await FxRate.findOne({
        where: { code: 'USD' },
        order: [['effective_at', 'DESC']],
    });

    return ok(res, {
        ...row.toJSON(),
        fxRate: fx ? parseFloat(fx.rateToFc) : null,
        fxRateId: fx ? fx.id : null,
    });
});

// Exported for the seeder
exports.DEFAULTS = DEFAULTS;
