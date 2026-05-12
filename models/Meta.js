const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meta = sequelize.define('Meta', {
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM('distancia_total', 'calorias_totales', 'sesiones', 'tiempo_total', 'peso'), allowNull: false },
    valor_esperado: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    valor_actual: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
}, {
    tableName: 'metas',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: false,
});

module.exports = Meta;