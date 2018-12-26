var Resource = require('../models/resource');
var usersController = require('./users');

module.exports = {
  insert: function(req, res, next) {
    usersController.setorder(req, res, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with setorder'});
      }
      var orderNum = user.order;
      Resource.findOneAndUpdate({'order': orderNum},
      {
        $push: {
          'array': {
            $each: [req.body.number],
            $sort: 1
          }
        }
      }, {upsert: true, new: true}, function(err, array) {
        if (err) {
          return res.status(500).json({'result': 'there was a problem on the database with insert'});
        }
        return res.status(200).json({'result': 'OK'});
      });
    });
  },

  show: function(req, res, next) {
    Resource.find({}).sort({'order': 1}).exec(function(err, results) {
        if (err) {
          return res.status(500).json({'result': 'there was a problem on the database with get resource'});
        }
        var resource_array = results.map(function(result) {
          return result.array;
        }).join(",");
        return res.status(200).json({'resource': resource_array});
    });
  }
}
