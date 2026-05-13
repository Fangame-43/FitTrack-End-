const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    peso_kg: { type: DataTypes.DECIMAL(5, 2) },
    altura_cm: { type: DataTypes.INTEGER },
    strava_token:         { type: DataTypes.STRING(255) },
    strava_refresh_token: { type: DataTypes.STRING(255) },
    strava_token_expiry:  { type: DataTypes.DATE },
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: false,
});

module.exports = Usuario;