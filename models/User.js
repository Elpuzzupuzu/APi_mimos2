const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),  // Contraseña hash
        allowNull: false
    },
    date_of_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    date_birth: {
        type: DataTypes.DATE,  // Nuevo campo para la fecha de nacimiento
        allowNull: false  // Puede ser nulo si no lo necesitas como obligatorio
    }
}, {
    timestamps: false
});

module.exports = User;
