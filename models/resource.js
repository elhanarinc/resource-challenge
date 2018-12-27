require('dotenv').config();
var mongoose = require('mongoose');
var ResourceSchema = new mongoose.Schema({
  order: Number,
  array: [Number]
});
var resource_collection;
if (process.env.NODE_ENV == 'test') {
  resource_collection = process.env.DB_COLL_RESOURCE_TEST;
} else {
  resource_collection = process.env.DB_COLL_RESOURCE_PROD;
}
mongoose.model('Resource', ResourceSchema, resource_collection);
module.exports = mongoose.model('Resource');
