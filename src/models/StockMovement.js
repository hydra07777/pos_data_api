// ============================================================
// StockMovement model — every change in stock is recorded
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'StockMovement',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
            type: {
                type: DataTypes.ENUM('in', 'out', 'adjustment'),
                allowNull: false,
            },
            quantity: { type: DataTypes.INTEGER, allowNull: false },
            reason: { type: DataTypes.STRING(255), allowNull: true },
            userId: { type: DataTypes.INTEGER, allowNull: true, field: 'user_id' },
        },
        {
            tableName: 'stock_movements',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );
