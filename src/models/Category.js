// ============================================================
// Category model — categorizes the products (drinks)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Category',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            label: { type: DataTypes.STRING(50), allowNull: false, unique: true },
            slug: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        },
        {
            tableName: 'categories',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );
