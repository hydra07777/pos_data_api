// ============================================================
// Product model — drinks (whiskies, sodas, beers, etc.)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Product',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(150), allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
            price: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
                validate: { min: 0 },
            },
            categoryId: { type: DataTypes.INTEGER, allowNull: false },
            imageUrl: {
                type: DataTypes.STRING(500),
                allowNull: false,
                defaultValue: '/drinks/placeholder.png',
                field: 'image_url',
            },
            stockQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                field: 'stock_quantity',
                validate: { min: 0 },
            },
            popularity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                field: 'is_active',
            },
        },
        {
            tableName: 'products',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            indexes: [{ fields: ['category_id'] }, { fields: ['stock_quantity'] }],
        }
    );
