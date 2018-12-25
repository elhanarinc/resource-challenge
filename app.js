// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var usersRouter = require('./routes/users');
// var authRouter = require('./routes/auth');
// var resourceRouter = require('./routes/resource');

// var app = express();
// var db = require('./db');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use('/users', usersRouter);
// app.use('/auth', authRouter);
// app.use('/resource', resourceRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


var express = require('express');
var app = express();
var db = require('./db');

var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');

app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

module.exports = app;
