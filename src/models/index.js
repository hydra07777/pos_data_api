const { sequelize, Sequelize } = require('../config/database');

// Each model file exports a factory: (sequelize) => Model
// We invoke them here so associations can be set up below.
const Category = require('./Category')(sequelize);
const Product = require('./Product')(sequelize);
const ProductSize = require('./ProductSize')(sequelize);
const Cashier = require('./Cashier')(sequelize);
const Customer = require('./Customer')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);
const Payment = require('./Payment')(sequelize);
const StockMovement = require('./StockMovement')(sequelize);
const Branding = require('./Branding')(sequelize);
const PresetTheme = require('./PresetTheme')(sequelize);
const FxRate = require('./FxRate')(sequelize);
const DashboardLog = require('./DashboardLog')(sequelize);

// ============================================================
// Associations
// ============================================================

// Category <-> Product
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Product <-> ProductSize
Product.hasMany(ProductSize, { foreignKey: 'productId', as: 'sizes', onDelete: 'CASCADE' });
ProductSize.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Product <-> StockMovement
Product.hasMany(StockMovement, { foreignKey: 'productId', as: 'movements', onDelete: 'CASCADE' });
StockMovement.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Cashier <-> StockMovement
Cashier.hasMany(StockMovement, { foreignKey: 'userId', as: 'stockMovements' });
StockMovement.belongsTo(Cashier, { foreignKey: 'userId', as: 'user' });

// Cashier <-> Order
Cashier.hasMany(Order, { foreignKey: 'cashierId', as: 'orders' });
Order.belongsTo(Cashier, { foreignKey: 'cashierId', as: 'cashier' });

// Customer <-> Order
Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Order <-> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product <-> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// ProductSize <-> OrderItem
ProductSize.hasMany(OrderItem, { foreignKey: 'sizeId', as: 'orderItems' });
OrderItem.belongsTo(ProductSize, { foreignKey: 'sizeId', as: 'size' });

// Order <-> Payment (1-1)
Order.hasOne(Payment, { foreignKey: 'orderId', as: 'payment', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Cashier <-> DashboardLog
Cashier.hasMany(DashboardLog, { foreignKey: 'cashierId', as: 'logs' });
DashboardLog.belongsTo(Cashier, { foreignKey: 'cashierId', as: 'cashier' });

module.exports = {
    sequelize,
    Sequelize,
    Category,
    Product,
    ProductSize,
    Cashier,
    Customer,
    Order,
    OrderItem,
    Payment,
    StockMovement,
    Branding,
    PresetTheme,
    FxRate,
    DashboardLog,
};
