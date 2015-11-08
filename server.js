// modules ====================================
var express  = require('express');
var fs = require('fs');
var app      = express();
var port     = process.env.PORT || 80;
var flash 	 = require('connect-flash');
var ECT = require('ect');
var ectRenderer = ECT({ cache: true, watch: false, root: __dirname + '/public/views'});

var mongoose = require('mongoose');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./app/config/database.js');

// configuration ==============================
mongoose.connect(configDB.url);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.engine('.html', ectRenderer.render);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(flash());

// routes ======================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport
// start app ==================================
app.listen(port);
console.log('Listening on Port: ' + port);