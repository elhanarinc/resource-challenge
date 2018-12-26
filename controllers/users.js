require('dotenv').config();
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = {
  register: function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with register'});
      } else if (user) {
        // https://httpstatuses.com/422
        return res.status(422).json({'result': 'user was already registered'});
      } else {
        bcrypt.hash(String(req.body.password), 10, function(err, hash) {
          if (err) {
            return res.status(500).json({'result': 'something went wrong on hashing password'});
          }
          User.create({
            name : req.body.name,
            email : req.body.email,
            password : hash,
            order: 0
          },
          function(err, user) {
            if (err) {
              return res.status(500).json({'result': 'there was a problem adding the user to the database'});
            }
            var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({'auth': true, 'token': token});
          });
        });
      }
    });
  },

  login: function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with login'});
      } else if (!user) {
        // https://httpstatuses.com/401
        return res.status(401).json({'auth': false, 'result': 'invalid email'});
      } else {
        bcrypt.compare(String(req.body.password), user.password, function(err, result) {
          if (err) {
            return res.status(500).json({'result': 'something went wrong comparing hash'})
          }
          if (!result) {
            return res.status(401).json({'auth': false, 'result':'password and email did not match'});
          }
          var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).json({'auth': true, 'token': token});
        });
      }
    });
  },

  setorder: function(req, res, next) {
    User.findOne({}).sort('-order').exec(function(err, result) {
      if (err) {
        return next(err, null);
      }
      var maxOrder = result.order;
      User.findById(req.userid, function(err, user) {
        if(err){
          return next(err, null);
        }
        var userOrder = user.order;
        if (userOrder == 0) {
          user.set({'order': maxOrder + 1});
          user.save(function(err, updatedUser) {
            if (err) {
              return next(err, null);
            }
            return next(null, updatedUser);
          });
        } else {
          return next(null, user);
        }
      });
    });
  },

  // For Debug Purposes
  info: function(req, res, next) {
    User.findById(req.userid, {_id: 0, password: 0, __v: 0}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with info'});
      }
      res.status(200).json(user);
    });
  },

  show: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with show users'});
      }
      res.status(200).json(users);
    });
  },

  drop: function(req, res, next) {
    User.deleteMany({}, function(err) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database with drop users'});
      }
      return res.status(200).json({'result': 'OK'});
    });
  }
};
