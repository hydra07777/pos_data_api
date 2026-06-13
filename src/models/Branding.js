// ============================================================
// Branding model — singleton row (id=1) for company info / colors
// ============================================================
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Branding',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, defaultValue: 1 },
            companyName: { type: DataTypes.STRING(120), allowNull: false, defaultValue: 'JOAC', field: 'company_name' },
            tagline: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'Specialty drinks & more' },
            logoText: { type: DataTypes.STRING(6), allowNull: false, defaultValue: 'J', field: 'logo_text' },
            primaryColor: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#f6905f', field: 'primary_color' },
            secondaryColor: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#fdebe1', field: 'secondary_color' },
            idNat: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '01-G4701-N25076X', field: 'id_nat' },
            rccm: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'CD/KNG/RCCM/17-A-03542' },
            taxNumber: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'A1720894F', field: 'tax_number' },
            address: { type: DataTypes.TEXT, allowNull: false, defaultValue: '03 Avenue Mbiloa / Ngaliema' },
            phone: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '+243974763940 / 819648854' },
            email: { type: DataTypes.STRING(150), allowNull: false, defaultValue: 'zuiya.mambula@gmail.com' },
        },
        {
            tableName: 'branding',
            timestamps: true,
            createdAt: false,
            updatedAt: 'updated_at',
            hooks: {
                beforeCreate: (row) => { row.id = 1; },
                beforeBulkCreate: (rows) => rows.forEach((r) => { r.id = 1; }),
            },
        }
    );
