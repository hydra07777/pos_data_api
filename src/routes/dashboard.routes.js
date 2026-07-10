// ============================================================
// /api/dashboard
// ============================================================
const router = require('express').Router();
const c = require('../controllers/dashboard.controller');

router.get('/summary', c.summary);
router.get('/activity', c.recentActivity);
router.get('/hourly', c.hourly);

module.exports = router;
