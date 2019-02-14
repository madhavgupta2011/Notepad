//Note is a class which can be found in the models folder
const Note = require('../models/Note');

//Function responsible for showing all the tasks 
module.exports.getTasks = (req,res,next)=>{
    Note.fetchAll((arr)=>{res.render('tasks',{
        'title' : 'Tasks',
        'tasksArr' : arr
    })});
};

//Function responsible for showing the individual task detail
module.exports.getTask = (req,res,next)=>{
    const ourTaskId = req.params.taskId;
    Note.findById(ourTaskId,(ourTask)=>{
        res.render('task-detail',{
            task:ourTask,
            'title':ourTask.title
        })
    })
};