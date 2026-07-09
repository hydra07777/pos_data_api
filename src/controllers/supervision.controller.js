// ============================================================
// Supervision controller — central console for invoice quota
// management and real-time platform monitoring.
// ============================================================
const { Op, fn, col, literal } = require('sequelize');
const { Order, Payment, PlatformSetting, Cashier } = require('../models');
const HttpError = require('../utils/httpError');
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');

// Default values used when no row exists yet in platform_settings.
const DEFAULTS = {
    invoice_quota: '1000',
    quota_enabled: 'true',
};

/**
 * Read a setting from the PlatformSetting table, falling back
 * to DEFAULTS when the row doesn't exist yet.
 */
async function getSetting(key) {
    const row = await PlatformSetting.findOne({ where: { key } });
    if (row) return row.value;
    return DEFAULTS[key] ?? null;
}

/**
 * Upsert a setting row.
 */
async function setSetting(key, value, label = null) {
    const existing = await PlatformSetting.findOne({ where: { key } });
    if (existing) {
        await existing.update({ value, label });
        return existing;
    }
    return PlatformSetting.create({ key, value, label });
}

// GET /api/supervision  ->  real-time platform stats
exports.stats = asyncH(async (_req, res) => {
    const quota = parseInt(await getSetting('invoice_quota'), 10);
    const quotaEnabled = (await getSetting('quota_enabled')) === 'true';

    // Total paid invoices (all time)
    const invoicesPrinted = await Order.count({ where: { status: 'paid' } });

    // Today's invoices
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const invoicesToday = await Order.count({
        where: { status: 'paid', created_at: { [Op.gte]: startOfDay } },
    });

    // This month's invoices
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const invoicesThisMonth = await Order.count({
        where: { status: 'paid', created_at: { [Op.gte]: startOfMonth } },
    });

    // Total revenue from paid orders
    const totalRevenue = await Order.sum('totalAmount', {
        where: { status: 'paid' },
    });

    // Active cashiers count
    const activeCashiers = await Cashier.count();

    const remaining = Math.max(0, quota - invoicesPrinted);
    const isBlocked = quotaEnabled && invoicesPrinted >= quota;

    return ok(res, {
        quota,
        quotaEnabled,
        invoicesPrinted,
        invoicesToday,
        invoicesThisMonth,
        totalRevenue: totalRevenue || 0,
        activeCashiers,
        remaining,
        isBlocked,
        utilization: quota > 0 ? Math.round((invoicesPrinted / quota) * 100) : 0,
    });
});

// PUT /api/supervision  ->  update quota settings
exports.update = asyncH(async (req, res) => {
    const { invoiceQuota, quotaEnabled } = req.body;

    const updates = {};

    if (invoiceQuota !== undefined) {
        const q = parseInt(invoiceQuota, 10);
        if (!Number.isFinite(q) || q < 0)
            throw HttpError.badRequest('invoiceQuota must be a non-negative integer');
        updates.invoice_quota = { value: String(q), label: 'Quota de factures' };
    }

    if (quotaEnabled !== undefined) {
        updates.quota_enabled = {
            value: quotaEnabled ? 'true' : 'false',
            label: 'Quota activé',
        };
    }

    for (const [key, { value, label }] of Object.entries(updates)) {
        await setSetting(key, value, label);
    }

    // Return the updated stats so the frontend can refresh in one call
    return exports.stats(req, res);
});

// GET /api/supervision/check  ->  lightweight endpoint used by
// the payment flow to verify if invoicing is still allowed.
exports.check = asyncH(async (_req, res) => {
    const quota = parseInt(await getSetting('invoice_quota'), 10);
    const quotaEnabled = (await getSetting('quota_enabled')) === 'true';

    if (!quotaEnabled) {
        return ok(res, { allowed: true, remaining: null, quota: null });
    }

    const invoicesPrinted = await Order.count({ where: { status: 'paid' } });
    const remaining = Math.max(0, quota - invoicesPrinted);
    const allowed = invoicesPrinted < quota;

    return ok(res, { allowed, remaining, quota, invoicesPrinted });
});
