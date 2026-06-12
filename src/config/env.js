// ============================================================
// Environment configuration — loaded once and exported
// ============================================================
require('dotenv').config();

const toInt = (v, def) => (v == null || v === '' ? def : parseInt(v, 10));
const toFloat = (v, def) => (v == null || v === '' ? def : parseFloat(v));
const toBool = (v, def) => (v == null ? def : String(v).toLowerCase() === 'true');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: toInt(process.env.PORT, 4000),
    apiPrefix: process.env.API_PREFIX || '/api',
    corsOrigins: (process.env.CORS_ORIGIN || '*')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),

    jwt: {
        secret: process.env.JWT_SECRET || 'change-me-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },

    db: {
        dialect: (process.env.DB_DIALECT || 'sqlite').toLowerCase(),
        storage: process.env.DB_STORAGE || './data/pos-brikin.sqlite',
        host: process.env.DB_HOST || 'localhost',
        port: toInt(process.env.DB_PORT, 5432),
        name: process.env.DB_NAME || 'pos_brikin',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    },

    upload: {
        dir: process.env.UPLOAD_DIR || './uploads',
        maxSizeMb: toInt(process.env.MAX_UPLOAD_SIZE_MB, 5),
    },

    business: {
        taxRate: toFloat(process.env.DEFAULT_TAX_RATE, 0.05),
        fxRate: toFloat(process.env.DEFAULT_FX_RATE, 2289.3077),
        lowStockThreshold: toInt(process.env.LOW_STOCK_THRESHOLD, 15),
    },
};
