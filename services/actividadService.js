const { Actividad } = require('../models');
const metaService = require('./metaService');
const logroService = require('./logroService');

exports.listar = (usuario_id) =>
    Actividad.findAll({ where: { usuario_id }, order: [['fecha', 'DESC']] });

exports.obtener = (id, usuario_id) =>
    Actividad.findOne({ where: { id, usuario_id } });

exports.crear = async (usuario_id, datos) => {
    const actividad = await Actividad.create({ ...datos, usuario_id });
    await metaService.actualizarProgreso(usuario_id);
    await logroService.evaluar(usuario_id);
    return actividad;
};

exports.actualizar = async (id, usuario_id, datos) => {
    const actividad = await Actividad.findOne({ where: { id, usuario_id } });
    if (!actividad) throw Object.assign(new Error('Actividad no encontrada'), { status: 404 });
    await actividad.update(datos);
    await metaService.actualizarProgreso(usuario_id);
    return actividad;
};

exports.eliminar = async (id, usuario_id) => {
    const actividad = await Actividad.findOne({ where: { id, usuario_id } });
    if (!actividad) throw Object.assign(new Error('Actividad no encontrada'), { status: 404 });
    await actividad.destroy();
    await metaService.actualizarProgreso(usuario_id);
};