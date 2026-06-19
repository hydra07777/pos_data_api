// ============================================================
// Entry point — boots Express and connects to the database
// ============================================================
const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`[db] connected (${env.db.dialect})`);

        // Sync schema without altering existing tables on every boot.
        await sequelize.sync();
        console.log('[db] schema synced');

        app.listen(env.port, () => {
            console.log(`[server] POS BRIKIN ready on http://localhost:${env.port}${env.apiPrefix}`);
            console.log(`[server] env=${env.env}  cors=${env.corsOrigins.join(',')}`);
        });
    } catch (err) {
        console.error('[fatal]', err);
        process.exit(1);
    }
})();

// Graceful shutdown
const shutdown = async (sig) => {
    console.log(`\n[server] received ${sig}, shutting down...`);
    try { await sequelize.close(); } catch (_) { /* noop */ }
    process.exit(0);
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
