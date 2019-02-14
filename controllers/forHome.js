//Note is a class which can be found in the models folder
const Note = require('../models/Note');

//Function responsible for getting the request of the homepage
module.exports.getNote = (req, res, next) => {
    res.render('home', {
        'title': 'Home'
    });
    res.end();
};

//Function responsible for Saving the incoming Note
module.exports.postNote = (req,res,next)=>{
    console.log(req.body.Note);
    const NoTe = new Note(req.body.Note);
    NoTe.save();
    res.redirect('/');
    res.end();
}

