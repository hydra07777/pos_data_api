// ============================================================
// Main API router — wires every feature router
// ============================================================
const express = require('express');
const router = express.Router();

router.use('/categories', require('./categories.routes'));
router.use('/products', require('./products.routes'));
router.use('/sizes', require('./sizes.routes'));
router.use('/cashiers', require('./cashiers.routes'));
router.use('/customers', require('./customers.routes'));
router.use('/orders', require('./orders.routes'));
router.use('/payments', require('./payments.routes'));
router.use('/stock', require('./stock.routes'));
router.use('/stock-movements', require('./stockMovements.routes'));
router.use('/branding', require('./branding.routes'));
router.use('/themes', require('./themes.routes'));
router.use('/fx-rates', require('./fxRates.routes'));
router.use('/dashboard', require('./dashboard.routes'));
router.use('/uploads', require('./uploads.routes'));

module.exports = router;
