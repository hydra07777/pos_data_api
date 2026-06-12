// ============================================================
// /api/fx-rates
// ============================================================
const router = require('express').Router();
const c = require('../controllers/fxRates.controller');

router.get('/', c.list);
router.get('/current', c.current);
router.post('/', c.create);
router.delete('/:id', c.remove);

module.exports = router;
