require('dotenv').config();
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  order: Number
});
var users_collection;
if (process.env.NODE_ENV == 'test') {
  users_collection = process.env.DB_COLL_USERS_TEST;
} else {
  users_collection = process.env.DB_COLL_USERS_PROD;
}
mongoose.model('User', UserSchema, users_collection);
module.exports = mongoose.model('User');
