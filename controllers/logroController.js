const { Logro, UsuarioLogro } = require('../models');

exports.index = async (req, res, next) => {
  try {
    const todos    = await Logro.findAll();
    const obtenidos = await UsuarioLogro.findAll({ where: { usuario_id: req.usuario.id } });
    const obtenidosMap = new Map(obtenidos.map(u => [u.logro_id, u.fecha_obtencion]));

    const logros = todos.map(l => ({
      ...l.toJSON(),
      obtenido:        obtenidosMap.has(l.id),
      fecha_obtencion: obtenidosMap.get(l.id) || null,
    }));

    res.render('logros/index', { usuario: req.usuario, logros });
  } catch (err) { next(err); }
};