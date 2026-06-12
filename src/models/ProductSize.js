// ============================================================
// ProductSize model — variants of a product (50cl, 75cl, 1L, S, M, L)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'ProductSize',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            productId: { type: DataTypes.INTEGER, allowNull: false },
            label: { type: DataTypes.STRING(20), allowNull: false },
            priceExtra: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
                defaultValue: 0,
                field: 'price_extra',
            },
        },
        {
            tableName: 'product_sizes',
            timestamps: false,
            indexes: [{ unique: true, fields: ['product_id', 'label'] }],
        }
    );
