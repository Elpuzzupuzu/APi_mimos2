const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
    id_order_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_order: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'id_order'
        }
    },
    id_product: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id_product'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: false
});

OrderItem.belongsTo(Order, { foreignKey: 'id_order' });
OrderItem.belongsTo(Product, { foreignKey: 'id_product' });

module.exports = OrderItem;
