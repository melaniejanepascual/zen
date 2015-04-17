// set up ======================================================================
// get all the tools we need
var express  = require('express');
var url      = require('url');
var app      = express();
var port     = process.env.PORT || 8080;

// configuration ===============================================================
app.set('view engine', 'ejs'); // set up ejs for templating

// routes and API ==============================================================
require('./routes/routes.js')(app);   // load our routes and pass in our app
require('./routes/api.js')(app, url); // load our API

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);