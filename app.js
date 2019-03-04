//* Starting of the document. 

/*
=> Declaration of variables which we require in the form of modules.
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

//Using express
const app = express();

//Enviornment Variables needed for the heroku deployment
const port = process.env.PORT || 3000;
const csrfProtection = csrf();
//Routing variables and the logic of these variables are situated in the routes Folder
const homeRoute = require('./routes/Home');
const taskRoute = require('./routes/tasks');
const errorRoute = require('./routes/404');
const authRoute = require('./routes/Auth');

const store = new MongoStore({
    uri : 'mongodb+srv://madhavgupta2011:madhavgupta@notepadcluster-pr1q1.mongodb.net/notes',
    collection : 'sessions'
})

// To set ejs as template engine
app.set('view engine', 'ejs');

//Declaration of the public directory as public directory
app.use(express.static(__dirname + '/public'));

//Parsing of the incoming request to our use in the form of middleware with the help of body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(compression());

app.use(session({
    secret: 'I am Madhav',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next();
})
// Using the Routers to route the incoming requests. You can find the logic of these routes in the routes folder
app.use(homeRoute);
app.use(taskRoute);
app.use(authRoute);

app.use(errorRoute);
mongoose.connect('mongodb+srv://madhavgupta2011:madhavgupta@notepadcluster-pr1q1.mongodb.net/notes?retryWrites=true', {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected');
    app.listen(port);
}).catch((err) => {
    console.log(err);
});


//* End of the document