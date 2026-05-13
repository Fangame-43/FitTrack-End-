const { Actividad, Meta } = require('../models');

exports.index = async (req, res, next) => {
    try {
        const [actividades, metas] = await Promise.all([
            Actividad.findAll({
                where: { usuario_id: req.usuario.id },
                order: [['fecha', 'DESC']],
                limit: 5,
            }),
            Meta.findAll({
                where: { usuario_id: req.usuario.id },
            }),
        ]);
        res.render('dashboard/index', { usuario: req.usuario, actividades, metas });
    } catch (err) {
        next(err);
    }
};