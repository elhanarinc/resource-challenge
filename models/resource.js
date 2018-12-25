var mongoose = require('mongoose');
var ResourceSchema = new mongoose.Schema({
  resource: [String]
});
mongoose.model('Resource', ResourceSchema);
module.exports = mongoose.model('Resource');
