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
        return res.status(422).json({'result': 'user was already registered'});
      } else {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword,
          order: 0
        },
        function(err, user) {
          if (err) {
            return res.status(500).json({'result': 'there was a problem adding the user to the database'});
          }
          var token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).json({'auth': true, 'token': token});
        });
      }
    });
  },

  login: function(req, res) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (err) {
        return res.status(500).json({'result': 'there was a problem on the database'});
      } else if (!user) {
        return res.status(401).json({'auth': false, 'result': 'invalid email'});
      } else {
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({'auth': false, 'result':'password and email did not match'});
        }
        var token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({'auth': true, 'token': token});
      }
    });
  },

  info: function(req, res) {
    User.findOne({'email': req.body.email}, function(err, user) {
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
