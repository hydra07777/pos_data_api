// ============================================================
// DashboardLog model — light-weight activity log for the dashboard
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'DashboardLog',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            type: {
                type: DataTypes.ENUM('order_placed', 'payment_received', 'discount_applied', 'refund', 'stock_adjustment'),
                allowNull: false,
            },
            label: { type: DataTypes.STRING(150), allowNull: false },
            amount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
            refId: { type: DataTypes.INTEGER, allowNull: true, field: 'ref_id' },
            cashierId: { type: DataTypes.INTEGER, allowNull: true, field: 'cashier_id' },
        },
        {
            tableName: 'dashboard_logs',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );
