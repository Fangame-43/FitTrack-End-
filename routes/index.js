const router    = require('express').Router();
const auth      = require('../middlewares/auth');
const dashCtrl  = require('../controllers/dashboardController');

router.use('/auth', require('./auth'));
router.get('/dashboard', auth, dashCtrl.index);
router.use('/actividades', require('./actividades'));
router.use('/metas', require('./metas'));

module.exports = router;