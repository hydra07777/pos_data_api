// ============================================================
// /api/stock-movements
// ============================================================
const router = require('express').Router();
const c = require('../controllers/stockMovements.controller');

router.get('/', c.list);

module.exports = router;
