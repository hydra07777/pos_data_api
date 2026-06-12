// ============================================================
// Sequelize instance — MySQL (primary) or PostgreSQL
// ============================================================
const { Sequelize } = require('sequelize');
const env = require('./env');

let sequelize;

if (env.db.dialect === 'mysql') {
    sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
        host: env.db.host,
        port: env.db.port,
        dialect: 'mysql',
        logging: env.env === 'development' ? console.log : false,
        define: { underscored: true, freezeTableName: false },
        dialectOptions: {
            // Recommended for MySQL 5.7+/8.0 strict mode
            dateStrings: true,
            typeCast: true,
        },
    });
} else if (env.db.dialect === 'postgres') {
    sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
        host: env.db.host,
        port: env.db.port,
        dialect: 'postgres',
        logging: env.env === 'development' ? console.log : false,
        define: { underscored: true, freezeTableName: false },
    });
} else {
    throw new Error(
        `Unsupported DB_DIALECT: "${env.db.dialect}". ` +
        `Set DB_DIALECT to "mysql" or "postgres" in your .env file.`
    );
}

module.exports = { sequelize, Sequelize };
