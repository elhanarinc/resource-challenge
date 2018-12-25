require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.DB_CONN_USERNAME + ':' + process.env.DB_CONN_PASS +
    '@' + process.env.DB_CONN_URL + '/' + process.env.DB_CONN_DBNAME + '?retryWrites=true',
    { useNewUrlParser: true });
