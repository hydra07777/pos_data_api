// ============================================================
// Pricing helpers — replicate the constants found in the front-end
//   TAX_RATE    = 0.05
//   FX_RATE     = 2289.3077  (1 USD = 2289.3077 FC)
// ============================================================
const env = require('../config/env');

const round2 = (n) => Math.round(parseFloat(n) * 100) / 100;

exports.computeTotals = ({ items, taxRate = env.business.taxRate, fxRate = env.business.fxRate }) => {
    const subtotal = items.reduce((s, it) => s + parseFloat(it.unitPrice) * it.quantity, 0);
    const taxAmount = 0;
    const total = subtotal;
    return {
        subtotal: round2(subtotal),
        taxRate,
        taxAmount: round2(taxAmount),
        totalAmount: round2(total),
        fxRate,
        equivalentFc: round2(total * fxRate),
    };
};
