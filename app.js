var express = require('express');
var app = express();
var db = require('./db');

var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');

app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

module.exports = app;
