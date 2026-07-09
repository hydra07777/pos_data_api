// ============================================================
// PlatformSetting model — key-value store for platform-level
// configuration (invoice quota, supervision flags, etc.)
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'PlatformSetting',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            key: {
                type: DataTypes.STRING(80),
                allowNull: false,
                unique: true,
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: '',
            },
            label: {
                type: DataTypes.STRING(120),
                allowNull: true,
            },
        },
        {
            tableName: 'platform_settings',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
