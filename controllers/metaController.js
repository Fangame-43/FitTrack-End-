const { Meta } = require('../models');

exports.index = async (req, res, next) => {
    try {
        const metas = await Meta.findAll({
            where: { usuario_id: req.usuario.id },
            order: [['fecha_inicio', 'DESC']],
        });
        res.render('metas/index', { usuario: req.usuario, metas, page: 'metas' });
    } catch (err) { next(err); }
};

exports.nueva = (req, res) =>
    res.render('metas/nueva', { usuario: req.usuario, page: 'metas' });

exports.crear = async (req, res, next) => {
    try {
        const { tipo, valor_esperado, fecha_inicio, fecha_fin } = req.body;
        if (new Date(fecha_fin) <= new Date(fecha_inicio)) {
            req.flash('error', 'La fecha de fin debe ser posterior a la de inicio');
            return res.redirect('/metas/nueva');
        }
        await Meta.create({ usuario_id: req.usuario.id, tipo, valor_esperado, fecha_inicio, fecha_fin });
        req.flash('success', 'Meta creada');
        res.redirect('/metas');
    } catch (err) { next(err); }
};

exports.editar = async (req, res, next) => {
    try {
        const meta = await Meta.findOne({ where: { id: req.params.id, usuario_id: req.usuario.id } });
        if (!meta) return res.redirect('/metas');
        res.render('metas/editar', { usuario: req.usuario, meta, page: 'metas' });
    } catch (err) { next(err); }
};

exports.actualizar = async (req, res, next) => {
    try {
        const meta = await Meta.findOne({ where: { id: req.params.id, usuario_id: req.usuario.id } });
        if (!meta) return res.redirect('/metas');
        const { tipo, valor_esperado, fecha_inicio, fecha_fin } = req.body;
        if (new Date(fecha_fin) <= new Date(fecha_inicio)) {
            req.flash('error', 'La fecha de fin debe ser posterior a la de inicio');
            return res.redirect(`/metas/${req.params.id}/editar`);
        }
        await meta.update({ tipo, valor_esperado, fecha_inicio, fecha_fin });
        req.flash('success', 'Meta actualizada');
        res.redirect('/metas');
    } catch (err) { next(err); }
};

exports.eliminar = async (req, res, next) => {
    try {
        const meta = await Meta.findOne({ where: { id: req.params.id, usuario_id: req.usuario.id } });
        if (!meta) return res.redirect('/metas');
        await meta.destroy();
        req.flash('success', 'Meta eliminada');
        res.redirect('/metas');
    } catch (err) { next(err); }
};
