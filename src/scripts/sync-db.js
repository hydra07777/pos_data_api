// ============================================================
// Sync the database schema (creates / alters all tables)
// Usage :  npm run db:sync
// ============================================================
const { sequelize } = require('../models');
const env = require('../config/env');

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`[db] connected (${env.db.dialect})`);
        await sequelize.sync({ alter: env.env !== 'production' });
        console.log('[db] schema synced');
        process.exit(0);
    } catch (err) {
        console.error('[fatal]', err);
        process.exit(1);
    }
})();
