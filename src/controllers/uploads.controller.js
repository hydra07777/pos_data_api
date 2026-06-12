// ============================================================
// Uploads controller — single + multiple
// ============================================================
const { ok } = require('../utils/apiResponse');
const asyncH = require('../utils/pick');
const { upload, uploadDir, single, multiple } = require('../middlewares/upload');

exports.single = [single('image'), asyncH(async (req, res) => {
    if (!req.file) return ok(res, null, 'No file uploaded');
    return ok(res, {
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
    });
})];

exports.multiple = [multiple('images', 10), asyncH(async (req, res) => {
    const files = (req.files || []).map((f) => ({
        filename: f.filename,
        url: `/uploads/${f.filename}`,
        size: f.size,
        mimetype: f.mimetype,
    }));
    return ok(res, { files, uploadDir });
})];

// Expose the underlying multer for advanced usage
exports._upload = upload;
exports._uploadDir = uploadDir;
