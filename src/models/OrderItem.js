// ============================================================
// OrderItem model — a line of an order (product, qty, size, price snapshot)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'OrderItem',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            orderId: { type: DataTypes.INTEGER, allowNull: false, field: 'order_id' },
            productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
            sizeId: { type: DataTypes.INTEGER, allowNull: true, field: 'size_id' },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1 },
            },
            unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: 'unit_price' },
            lineTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: 'line_total' },
            position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        },
        {
            tableName: 'order_items',
            timestamps: false,
            indexes: [
                { fields: ['order_id'] },
                { fields: ['product_id'] },
            ],
        }
    );
