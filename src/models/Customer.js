// ============================================================
// Customer model — anonymous sales by default, but stored for loyalty
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Customer',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            type: {
                type: DataTypes.ENUM('person', 'company'),
                allowNull: false,
                defaultValue: 'person',
            },
            name: { type: DataTypes.STRING(150), allowNull: false },
            phone: { type: DataTypes.STRING(30), allowNull: true },
            email: { type: DataTypes.STRING(150), allowNull: true },
            taxId: { type: DataTypes.STRING(50), allowNull: true, field: 'tax_id' },
            address: { type: DataTypes.TEXT, allowNull: true },
        },
        {
            tableName: 'customers',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );
