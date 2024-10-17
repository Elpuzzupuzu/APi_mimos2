const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    limit_edition: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(100),  // Campo actualizado para la URL de la imagen
        allowNull: true  // Opcional, puede ser true o false según tus requerimientos
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    season: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    date_on_sale: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

module.exports = Product;
