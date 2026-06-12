// ============================================================
// Cashier model — server-side "user" (seller / vendor)
// ============================================================
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const Cashier = sequelize.define(
        'Cashier',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
            fullName: { type: DataTypes.STRING(120), allowNull: false, field: 'full_name' },
            email: { type: DataTypes.STRING(150), allowNull: true, unique: true },
            phone: { type: DataTypes.STRING(30), allowNull: true },
            passwordHash: { type: DataTypes.STRING(255), allowNull: true, field: 'password_hash' },
            role: {
                type: DataTypes.ENUM('cashier', 'manager', 'admin'),
                allowNull: false,
                defaultValue: 'cashier',
            },
            avatarUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'avatar_url' },
            isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
        },
        {
            tableName: 'cashiers',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );

    Cashier.prototype.verifyPassword = function (plain) {
        if (!this.passwordHash) return false;
        return bcrypt.compareSync(plain, this.passwordHash);
    };

    Cashier.hashPassword = function (plain) {
        return bcrypt.hashSync(plain, 10);
    };

    return Cashier;
};
