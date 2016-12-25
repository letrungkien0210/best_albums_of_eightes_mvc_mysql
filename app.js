var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const swigPackage = require('swig');

var index = require('./controllers/index');
//Inject band controller
var bands = require('./controllers/Band');
//Inject user controller
var users = require('./controllers/User');

var app = express();

// view engine setup
let swig = new swigPackage.Swig();
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.show);
//Defining route to list and post
app.get('/bands', bands.list);
//Get band by ID
app.get('/bands/:id', bands.byId);
//Create a band
app.post('/bands', bands.create);
//Update
app.put('/bands/:id', bands.update);
//Delete by id
app.delete('/bands/:id', bands.delete);
// Defining route to list and post users 
app.get('/users', users.list);
app.post('/users', users.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;