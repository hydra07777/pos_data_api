// ============================================================
// PresetTheme model — pre-defined color palettes
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'PresetTheme',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
            primaryColor: { type: DataTypes.STRING(7), allowNull: false, field: 'primary_color' },
            secondaryColor: { type: DataTypes.STRING(7), allowNull: false, field: 'secondary_color' },
        },
        {
            tableName: 'preset_themes',
            timestamps: false,
        }
    );
