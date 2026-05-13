const { Usuario, Actividad } = require('../models');
const { fn, col, literal }   = require('sequelize');

exports.index = async (req, res, next) => {
  try {
    const ranking = await Usuario.findAll({
      attributes: [
        'id', 'nombre',
        [fn('COUNT', col('actividades.id')),          'total_sesiones'],
        [fn('SUM',   col('actividades.calorias')),    'total_calorias'],
        [fn('SUM',   col('actividades.distancia_km')),'total_distancia'],
      ],
      include: [{
        model:      Actividad,
        as:         'actividades',
        attributes: [],
        required:   false,
      }],
      group:  ['Usuario.id'],
      order:  [[literal('total_sesiones'), 'DESC']],
      subQuery: false,
      limit:  20,
    });

    res.render('ranking/index', { usuario: req.usuario, ranking, page: 'ranking' });
  } catch (err) { next(err); }
};
