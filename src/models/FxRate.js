// ============================================================
// FxRate model — historical exchange rates (USD -> FC)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'FxRate',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            code: { type: DataTypes.STRING(3), allowNull: false },
            rateToFc: { type: DataTypes.DECIMAL(14, 4), allowNull: false, field: 'rate_to_fc' },
            effectiveAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'effective_at',
            },
        },
        {
            tableName: 'fx_rates',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );
