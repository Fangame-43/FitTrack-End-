const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Actividad = sequelize.define('Actividad', {
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM('correr', 'ciclismo', 'natacion', 'caminata', 'gimnasio', 'otro'), allowNull: false },
    duracion_min: { type: DataTypes.INTEGER, allowNull: false },
    calorias: { type: DataTypes.INTEGER },
    distancia_km: { type: DataTypes.DECIMAL(6, 2) },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    notas: { type: DataTypes.TEXT },
    strava_id: { type: DataTypes.STRING(100), unique: true },
}, {
    tableName: 'actividades',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: false,
});

module.exports = Actividad;