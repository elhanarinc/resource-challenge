var mongoose = require('mongoose');
var ResourceSchema = new mongoose.Schema({
  order: Number,
  array: [Number]
});
mongoose.model('Resource', ResourceSchema, 'resource');
module.exports = mongoose.model('Resource');
