// ============================================================
// Global error handler — converts thrown errors to JSON responses
// ============================================================
const { MulterError } = require('multer');
const { ValidationError: SequelizeValidationError } = require('sequelize');
const HttpError = require('../utils/httpError');
const env = require('../config/env');

module.exports = (err, _req, res, _next) => {
    // Custom HTTP error
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            details: err.details || undefined,
        });
    }

    // Multer
    if (err instanceof MulterError) {
        return res.status(400).json({
            success: false,
            message: `Upload error: ${err.message}`,
            details: { code: err.code, field: err.field },
        });
    }

    // Sequelize validation
    if (err instanceof SequelizeValidationError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: err.errors.map((e) => ({ field: e.path, message: e.message })),
        });
    }

    // Unique constraint
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            message: 'Duplicate value',
            details: err.errors.map((e) => ({ field: e.path, value: e.value })),
        });
    }

    // Fallback
    console.error('[UNHANDLED ERROR]', err);
    return res.status(500).json({
        success: false,
        message: env.env === 'production' ? 'Internal server error' : err.message,
    });
};
