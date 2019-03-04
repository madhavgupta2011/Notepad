const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports.getSignUp = (req, res, next) => {
    res.render('Sign-Up.ejs', {
        title: 'Sign Up',
        csrfToken : req.csrfToken()
    });
};

module.exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    bcrypt.hash(password, 12).then(hash => {
        const user = new User({
            name: name,
            email: email,
            password: hash,
            notes:[]
        })
        req.session.IsDone = true;
        return user.save()
    }).then(() => {
        res.redirect('/')
    }).catch(err => {
        console.log(err);
    })
}

module.exports.getLogIn = (req,res,next)=>{
    let message = req.flash('error');
    (message.length>0) ? message=message[0] : message=null
    res.render('Log-In',{
        title: 'Log In',
        csrfToken : req.csrfToken(),
        errorMessage: message
    });
}

module.exports.postLogIn = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then((user)=>{
            if(!user){
                req.flash('error','invalid username or password');
                return res.redirect('/log-in');
            }
            bcrypt.compare(password,user.password)
                .then((result)=>{
                    if(!result){
                        return res.redirect('/log-in');
                    }
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    console.log(req.session.user);
                    res.redirect('/');
                }).catch((err)=>{
                    console.log(err);
                })
        })
}

module.exports.getLogOut = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
}