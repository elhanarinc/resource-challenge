require('dotenv').config();
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = {
  register: function(req, res) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database'});
      } else if (user) {
        // https://httpstatuses.com/422
        return res.status(422).json({'result': 'user was already registered'});
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
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

  login: function(req, res) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database'});
      } else if (!user) {
        // https://httpstatuses.com/401
        return res.status(401).json({'auth': false, 'result': 'invalid email'});
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
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

  info: function(req, res) {
    User.findById(req.userid, {_id: 0, password: 0, __v: 0}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem finding specific user'});
      }
      res.status(200).json(user);
    });
  },

  showall: function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem finding users'});
      }
      res.status(200).json(users);
    });
  },

  dropall: function(req, res) {
    User.deleteMany({}, function(err) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem deleting users'});
      }
      return res.status(200).json({'result': 'OK'});
    });
  }
};
