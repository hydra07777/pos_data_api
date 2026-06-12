// ============================================================
// /api/themes
// ============================================================
const router = require('express').Router();
const c = require('../controllers/themes.controller');

router.get('/', c.list);
router.post('/', c.create);
router.delete('/:id', c.remove);

module.exports = router;
