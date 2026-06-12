// ============================================================
// Order model — main sales document (invoice / ticket)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Order',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            orderNumber: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
                field: 'order_number',
            },
            cashierId: { type: DataTypes.INTEGER, allowNull: false, field: 'cashier_id' },
            customerId: { type: DataTypes.INTEGER, allowNull: true, field: 'customer_id' },
            status: {
                type: DataTypes.ENUM('draft', 'pending', 'paid', 'refunded', 'cancelled'),
                allowNull: false,
                defaultValue: 'pending',
            },
            subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
            taxRate: {
                type: DataTypes.DECIMAL(5, 4),
                allowNull: false,
                defaultValue: 0.05,
                field: 'tax_rate',
            },
            taxAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: 'tax_amount' },
            totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0, field: 'total_amount' },
            currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: 'USD' },
            fxRate: { type: DataTypes.DECIMAL(12, 4), allowNull: false, defaultValue: 2289.3077, field: 'fx_rate' },
            paidAt: { type: DataTypes.DATE, allowNull: true, field: 'paid_at' },
        },
        {
            tableName: 'orders',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
            indexes: [
                { fields: ['status'] },
                { fields: ['created_at'] },
                { fields: ['cashier_id'] },
            ],
        }
    );
