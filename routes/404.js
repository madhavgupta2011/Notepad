const errorController = require('../controllers/forError');

const app = require('express');

const router = app.Router();

router.use(errorController.getError);

module.exports = router;