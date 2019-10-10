const router = require('express').Router();
const controller = require('../controllers/file');

router.route('/process')
    .post(controller.process)
    .get(controller.status);

router.route('/process/:id')
    .get(controller.statusById);

module.exports = router;