const router = require('express').Router();
const ctrl   = require('../controllers/logroController');
const auth   = require('../middlewares/auth');

router.use(auth);
router.get('/', ctrl.index);

module.exports = router;