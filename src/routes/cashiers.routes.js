// ============================================================
// /api/cashiers
// ============================================================
const router = require('express').Router();
const c = require('../controllers/cashiers.controller');

router.get('/', c.list);
router.post('/login', c.login);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
