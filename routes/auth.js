const router = require('express').Router();
const ctrl   = require('../controllers/authController');

router.get('/login',    ctrl.mostrarLogin);
router.get('/registro', ctrl.mostrarRegistro);
router.post('/login',    ctrl.login);
router.post('/registro', ctrl.registro);
router.get('/logout',   ctrl.logout);

module.exports = router;