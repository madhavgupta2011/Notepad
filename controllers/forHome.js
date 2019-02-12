const Note = require('../models/Note');

module.exports.getNote = (req, res, next) => {
    res.render('home', {
        'title': 'Home'
    });
    res.end();
};

module.exports.postNote = (req,res,next)=>{
    console.log(req.body.Note);
    const NoTe = new Note(req.body.Note);
    NoTe.save();
    res.redirect('/');
    res.end();
}

