// ============================================================
// /api/supervision — platform supervision console
// ============================================================
const router = require('express').Router();
const c = require('../controllers/supervision.controller');

router.get('/', c.stats);
router.get('/check', c.check);
router.put('/', c.update);

module.exports = router;
