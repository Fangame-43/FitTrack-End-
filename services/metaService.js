const { Meta, Actividad } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.actualizarProgreso = async (usuario_id) => {
    const metas = await Meta.findAll({ where: { usuario_id } });

    for (const meta of metas) {
        let valor_actual = 0;
        const where = { usuario_id, fecha: { [Op.between]: [meta.fecha_inicio, meta.fecha_fin] } };

        if (meta.tipo === 'distancia_total') {
            const r = await Actividad.findOne({ where, attributes: [[fn('SUM', col('distancia_km')), 'total']] });
            valor_actual = parseFloat(r?.dataValues.total || 0);
        } else if (meta.tipo === 'calorias_totales') {
            const r = await Actividad.findOne({ where, attributes: [[fn('SUM', col('calorias')), 'total']] });
            valor_actual = parseFloat(r?.dataValues.total || 0);
        } else if (meta.tipo === 'sesiones') {
            valor_actual = await Actividad.count({ where });
        } else if (meta.tipo === 'tiempo_total') {
            const r = await Actividad.findOne({ where, attributes: [[fn('SUM', col('duracion_min')), 'total']] });
            valor_actual = parseFloat(r?.dataValues.total || 0);
        }

        await meta.update({ valor_actual });
    }
};