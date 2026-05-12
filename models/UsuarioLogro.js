const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioLogro = sequelize.define('UsuarioLogro', {
    usuario_id: { type: DataTypes.INTEGER, primaryKey: true },
    logro_id: { type: DataTypes.INTEGER, primaryKey: true },
    fecha_obtencion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'usuario_logros',
    timestamps: false,
});

module.exports = UsuarioLogro;