//* Starting of the document. 

/*
=> Declaration of variables which we require in the form of modules.
*/
const express = require('express');
const bodyParser = require('body-parser');

//Using express
const app = express();

//Enviornment Variables needed for the heroku deployment
const port = process.env.PORT || 3000;

//Routing variables and the logic of these variables are situated in the routes Folder
const homeRoute = require('./routes/Home');
const taskRoute = require('./routes/tasks');
const errorRoute = require('./routes/404');
const mongoConnect = require('./util/database');

// To set ejs as template engine
app.set('view engine','ejs');

//Declaration of the public directory as public directory
app.use(express.static(__dirname + '/public'));

//Parsing of the incoming request to our use in the form of middleware with the help of body-parser
app.use(bodyParser.urlencoded({extended:false}));

// Using the Routers to route the incoming requests. You can find the logic of these routes in the routes folder
app.use(homeRoute);
app.use(taskRoute);

app.use(errorRoute);


app.listen(port);

//* End of the document