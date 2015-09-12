//requiring all dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var configdb = require('./config/db.js');
var session = require('express-session');

//setting up view engine
app.set('view-engine', 'ejs');

//link to style sheets, js files, and static html
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
// app.use(express.static('public'));

//setting up express application
app.use(morgan('dev'));
app.use(cookieparser());
app.use(bodyparser());
app.use(bodyparser.json()); // for parsing application/json
app.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//passport.js stuff
app.use(session({ secret: 'secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
//app.use(flash()); 

//express routing
require('./app/routes.js')(app, passport);
require('./config/passport')(passport);

//db connection
mongoose.connect(configdb.url);

mongoose.connection.on('open', function (ref) {
  console.log('Connected to Mongo server...');
});

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to Mongo server...');
  console.log(err);
});


//server stuff
var port = 8000;
app.listen(port);
console.log("App running on port ", port);