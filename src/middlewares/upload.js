// ============================================================
// Multer configuration — disk storage for product images
// ============================================================
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const env = require('../config/env');
const HttpError = require('../utils/httpError');

const uploadDir = path.isAbsolute(env.upload.dir)
    ? env.upload.dir
    : path.resolve(process.cwd(), env.upload.dir);

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || '.bin';
        const name = `${Date.now()}-${uuidv4()}${ext}`;
        cb(null, name);
    },
});

const fileFilter = (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(HttpError.badRequest(`Unsupported file type: ${file.mimetype}`));
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: env.upload.maxSizeMb * 1024 * 1024 },
});

module.exports = {
    upload,
    uploadDir,
    single: (field = 'image') => upload.single(field),
    multiple: (field = 'images', max = 10) => upload.array(field, max),
};
