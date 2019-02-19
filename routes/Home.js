const Homecontroller = require('../controllers/forHome');

const app = require('express');

const router = app.Router();

router.get('/',Homecontroller.getNote);

router.post('/submit-task',Homecontroller.postNote);

module.exports = router;