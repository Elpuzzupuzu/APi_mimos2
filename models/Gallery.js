const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
    id_gallery: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imagetype: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(200),
        defaultValue: false
    }
   
}, {
    timestamps: false
});

module.exports = Gallery;
