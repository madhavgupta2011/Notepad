//Note is a class which can be found in the models folder
const Note = require('../models/Note');
const mongoose = require('mongoose');

//Function responsible for showing all the tasks 
module.exports.getTasks = (req, res, next) => {
    let data={}
    if (req.session.isLoggedIn) {
        data= {
            userId: req.session.user._id
        }
    } else {
        data = {
            userId: null
        }
    }
    Note.find(data).then((arr) => {
        res.render('tasks', {
            'title': 'Tasks',
            'tasks': arr,
            csrfToken : req.csrfToken()
        })
    }).catch((err) => {
        console.log(err);
    });
};

//Function responsible for showing the individual task detail
module.exports.getTask = (req, res, next) => {
    const ourTaskId = req.params.taskId;
    Note.findById(ourTaskId).then((ourTask) => {
        res.render('task-detail', {
            task: ourTask,
            'title': ourTask.title,
            csrfToken : req.csrfToken()
        })
    }).catch((err) => {
        console.log(err);
    });
};

module.exports.getEditTask = (req, res, next) => {
    const taskId = req.params.taskId;
    Note.findOne({
        _id: mongoose.Types.ObjectId(taskId)
    }).then((note) => {
        res.render('edit-note', {
            title: 'Edit Note',
            note: note,
            csrfToken : req.csrfToken()
        })
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.postEditTask = (req, res, next) => {
    const taskId = req.params.taskId;
    const updatedTitle = req.body.title;
    const updatedUser = req.body.user;
    const updatedDescription = req.body.description;
    let updatedUserId
    if(req.session.isLoggedIn){
updatedUserId = req.session.user._id;
    }
    else{
        updatedUserId=null;
    }

    Note.findOne({
            _id: mongoose.Types.ObjectId(taskId)
        }).then((note) => {
            note.title = updatedTitle;
            note.user = updatedUser;
            note.description = updatedDescription;
            note.userId = updatedUserId;
            return note.save();
        }).then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getDeleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    Note.findOneAndDelete({
        _id: mongoose.Types.ObjectId(taskId)
    }).then((note) => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })

}