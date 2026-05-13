const service = require('../services/actividadService');

exports.index = async (req, res, next) => {
    try {
        const actividades = await service.listar(req.usuario.id);
        res.render('actividades/index', { usuario: req.usuario, actividades });
    } catch (err) { next(err); }
};

exports.nueva = (req, res) =>
    res.render('actividades/nueva', { usuario: req.usuario });

exports.crear = async (req, res, next) => {
    try {
        await service.crear(req.usuario.id, req.body);
        req.flash('success', 'Actividad registrada');
        res.redirect('/actividades');
    } catch (err) { next(err); }
};

exports.detalle = async (req, res, next) => {
    try {
        const actividad = await service.obtener(req.params.id, req.usuario.id);
        if (!actividad) return res.redirect('/actividades');
        res.render('actividades/detalle', { usuario: req.usuario, actividad });
    } catch (err) { next(err); }
};

exports.editar = async (req, res, next) => {
    try {
        const actividad = await service.obtener(req.params.id, req.usuario.id);
        if (!actividad) return res.redirect('/actividades');
        res.render('actividades/editar', { usuario: req.usuario, actividad });
    } catch (err) { next(err); }
};

exports.actualizar = async (req, res, next) => {
    try {
        await service.actualizar(req.params.id, req.usuario.id, req.body);
        req.flash('success', 'Actividad actualizada');
        res.redirect('/actividades');
    } catch (err) { next(err); }
};

exports.eliminar = async (req, res, next) => {
    try {
        await service.eliminar(req.params.id, req.usuario.id);
        req.flash('success', 'Actividad eliminada');
        res.redirect('/actividades');
    } catch (err) { next(err); }
};