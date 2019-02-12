//* Starting of the document. 

/*
=> Declaration of variable which we require in the form of modules.
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

const homeRoute = require('./routes/Home');
const taskRoute = require('./routes/tasks');


// To set ejs as template engine
app.set('view engine','ejs');

//Declaration of the public directory as public directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));


app.use(homeRoute);
app.use(taskRoute);

app.use((req,res,next)=>{
    res.status(404).render('404',{
        'title': '404 Error'
    });
})
app.listen(port);