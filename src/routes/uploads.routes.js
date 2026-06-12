// ============================================================
// /api/uploads  — single + multiple file uploads (Multer)
// ============================================================
const router = require('express').Router();
const c = require('../controllers/uploads.controller');

router.post('/image', c.single);
router.post('/images', c.multiple);

module.exports = router;
