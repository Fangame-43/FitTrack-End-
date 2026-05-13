const router = require('express').Router();
const ctrl = require('../controllers/actividadController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', ctrl.index);
router.get('/nueva', ctrl.nueva);
router.post('/', ctrl.crear);
const stravaService = require('../services/stravaService');
const metaService = require('../services/metaService');
const logroService = require('../services/logroService');

// Redirige al usuario a Strava para autorizar
router.get('/strava/conectar', auth, (req, res) => {
    res.redirect(stravaService.getAuthUrl());
});

// Strava redirige aquí con el code
router.get('/strava/callback', auth, async (req, res, next) => {
    try {
        const { code, error } = req.query;
        if (error || !code) {
            req.flash('error', 'Autorización cancelada');
            return res.redirect('/actividades');
        }
        await stravaService.handleCallback(req.usuario.id, code);
        req.flash('success', 'Cuenta de Strava conectada');
        res.redirect('/actividades');
    } catch (err) { next(err); }
});

// Importa las últimas 30 actividades
router.post('/strava/importar', auth, async (req, res, next) => {
    try {
        const { importadas, duplicadas } = await stravaService.importarActividades(req.usuario.id);
        await metaService.actualizarProgreso(req.usuario.id);
        await logroService.evaluar(req.usuario.id);
        req.flash('success', `${importadas} actividades importadas, ${duplicadas} ya existían`);
        res.redirect('/actividades');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/actividades');
    }
});
router.get('/:id', ctrl.detalle);
router.get('/:id/editar', ctrl.editar);
router.post('/:id/editar', ctrl.actualizar);
router.post('/:id/eliminar', ctrl.eliminar);

module.exports = router;