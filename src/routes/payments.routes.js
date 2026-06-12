// ============================================================
// /api/payments
// ============================================================
const router = require('express').Router();
const c = require('../controllers/payments.controller');

router.get('/', c.list);
router.get('/:id', c.getOne);
router.delete('/:id', c.remove);

module.exports = router;
