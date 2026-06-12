// ============================================================
// /api/stock
// ============================================================
const router = require('express').Router();
const c = require('../controllers/stock.controller');

router.get('/low', c.listLowStock);

module.exports = router;
