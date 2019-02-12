const Note = require('../models/Note');
module.exports.getTasks = (req,res,next)=>{
    Note.fetchAll((arr)=>{res.render('tasks',{
        'title' : 'Tasks',
        'tasksArr' : arr
    })});
};