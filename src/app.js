// ============================================================
// Express application — composed here, started from index.js
// ============================================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const env = require('./config/env');
const { attachCashierIfPresent } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const apiRouter = require('./routes');

const app = express();

// ---------------- Security & parsing ----------------
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
);
app.use(
    cors({
        origin: env.corsOrigins.includes('*') ? true : env.corsOrigins,
        credentials: true,
    })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.env === 'production' ? 'combined' : 'dev'));

// ---------------- Static uploads (Multer) ----------------
app.use(
    '/uploads',
    express.static(path.resolve(process.cwd(), env.upload.dir), {
        maxAge: '7d',
    })
);

// ---------------- Health-check ----------------
app.get('/health', (_req, res) =>
    res.json({ success: true, data: { status: 'ok', env: env.env, time: new Date() } })
);

// ---------------- Optional cashier context ----------------
app.use(attachCashierIfPresent);

// ---------------- API ----------------
app.use(env.apiPrefix, apiRouter);

// ---------------- 404 & errors ----------------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
