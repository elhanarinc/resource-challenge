var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  order: Number
});
mongoose.model('User', UserSchema, 'users');
module.exports = mongoose.model('User');
