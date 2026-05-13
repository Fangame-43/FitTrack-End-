const router    = require('express').Router();
const auth      = require('../middlewares/auth');
const dashCtrl  = require('../controllers/dashboardController');

router.use('/auth', require('./auth'));
router.get('/dashboard', auth, dashCtrl.index);

module.exports = router;