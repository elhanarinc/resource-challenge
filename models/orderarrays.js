var mongoose = require('mongoose');
var OrderArraysSchema = new mongoose.Schema({
  order: Number,
  ownresource: [String]
});
mongoose.model('OrderArrays', OrderArraysSchema);
module.exports = mongoose.model('OrderArrays');
