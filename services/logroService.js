const { Actividad, Logro, UsuarioLogro } = require('../models');
const { fn, col } = require('sequelize');

const evaluadores = {
    'actividades >= 1': async (uid) => (await Actividad.count({ where: { usuario_id: uid } })) >= 1,
    'actividades >= 10': async (uid) => (await Actividad.count({ where: { usuario_id: uid } })) >= 10,
    'actividades >= 50': async (uid) => (await Actividad.count({ where: { usuario_id: uid } })) >= 50,
    'distancia_correr >= 42': async (uid) => {
        const r = await Actividad.findOne({
            where: { usuario_id: uid, tipo: 'correr' },
            attributes: [[fn('SUM', col('distancia_km')), 'total']],
        });
        return parseFloat(r?.dataValues.total || 0) >= 42;
    },
    'calorias_total >= 5000': async (uid) => {
        const r = await Actividad.findOne({
            where: { usuario_id: uid },
            attributes: [[fn('SUM', col('calorias')), 'total']],
        });
        return parseFloat(r?.dataValues.total || 0) >= 5000;
    },
};

exports.evaluar = async (usuario_id) => {
    const logros = await Logro.findAll();
    const obtenidos = await UsuarioLogro.findAll({ where: { usuario_id } });
    const yaObtenidos = new Set(obtenidos.map(u => u.logro_id));

    for (const logro of logros) {
        if (yaObtenidos.has(logro.id)) continue;
        const fn = evaluadores[logro.condicion];
        if (!fn) continue;
        const cumple = await fn(usuario_id);
        if (cumple) await UsuarioLogro.create({ usuario_id, logro_id: logro.id });
    }
};