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
module.exports.postNote = (req, res, next) => {
    const title = req.body.title;
    const user = req.body.user;
    const description = req.body.description;
    const NoTe = new Note({
        title: title,
        user: user,
        description: description
    });
    NoTe.save().then((result) => {
        res.redirect('/');
        res.end();
    }).catch((err) => {
        console.log(err);
    });;

}