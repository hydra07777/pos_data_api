// ============================================================
// /api/branding
// ============================================================
const router = require('express').Router();
const c = require('../controllers/branding.controller');

router.get('/', c.get);
router.put('/', c.update);
router.post('/reset', c.reset);

module.exports = router;
