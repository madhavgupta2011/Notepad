const tasksController = require('../controllers/fortasks');

const app = require('express');

const router = app.Router();


router.get('/tasks',tasksController.getTasks);

router.get('/tasks/:taskId',tasksController.getTask);

router.get('/tasks/edit-task/:taskId',tasksController.getEditTask);

router.post('/tasks/edit-task/:taskId',tasksController.postEditTask);

router.get('/tasks/delete-task/:taskId',tasksController.getDeleteTask);

module.exports = router;