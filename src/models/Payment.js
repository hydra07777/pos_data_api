// ============================================================
// Payment model — one-to-one with Order
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Payment',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                field: 'order_id',
            },
            method: {
                type: DataTypes.ENUM('cash', 'card', 'mobile', 'other'),
                allowNull: false,
            },
            amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            reference: { type: DataTypes.STRING(120), allowNull: true },
            paidAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'paid_at' },
        },
        {
            tableName: 'payments',
            timestamps: false,
        }
    );
