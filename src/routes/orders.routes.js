// ============================================================
// /api/orders
// ============================================================
const router = require('express').Router();
const c = require('../controllers/orders.controller');

router.get('/', c.list);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.post('/:id/pay', c.pay);
router.post('/:id/refund', c.refund);
router.post('/:id/cancel', c.cancel);
router.delete('/:id', c.remove);

module.exports = router;
