const tasksController = require('../controllers/fortasks');

const app = require('express');

const router = app.Router();


router.get('/tasks',tasksController.getTasks);

router.get('/tasks/:taskId',tasksController.getTask);

module.exports = router;