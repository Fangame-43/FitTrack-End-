const router = require('express').Router();
const ctrl   = require('../controllers/metaController');
const auth   = require('../middlewares/auth');

router.use(auth);

router.get('/',              ctrl.index);
router.get('/nueva',         ctrl.nueva);
router.post('/',             ctrl.crear);
router.get('/:id/editar',    ctrl.editar);
router.post('/:id/editar',   ctrl.actualizar);
router.post('/:id/eliminar', ctrl.eliminar);

module.exports = router;