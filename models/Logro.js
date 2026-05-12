const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logro = sequelize.define('Logro', {
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    descripcion: { type: DataTypes.TEXT },
    condicion: { type: DataTypes.STRING(255), allowNull: false },
    icono: { type: DataTypes.STRING(100) },
}, {
    tableName: 'logros',
    timestamps: false,
});

module.exports = Logro;