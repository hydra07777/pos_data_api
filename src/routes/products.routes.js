// ============================================================
// /api/products  +  /api/products/:id/stock
// ============================================================
const router = require('express').Router();
const c = require('../controllers/products.controller');
const stock = require('../controllers/stock.controller');
const sizes = require('../controllers/sizes.controller');

router.get('/', c.list);
router.get('/low-stock', c.lowStock);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

// Stock operations
router.get('/:id/stock', stock.getStockByProduct);
router.post('/:id/stock', c.adjustStock);

// Product sizes
router.get('/:productId/sizes', sizes.listForProduct);
router.post('/:productId/sizes', sizes.create);
router.delete('/:productId/sizes/:id', sizes.remove);

module.exports = router;
