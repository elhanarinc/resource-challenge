var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var userController = require('../controllers/users');

router.post('/register', function(req, res) {
  userController.register(req, res);
});

router.post('/login', function(req, res) {
  userController.login(req, res);
});

// For Debug purposes
router.get('/info', function(req, res) {
  userController.info(req, res);
});

router.get('/dropall', function(req, res) {
  userController.dropall(req, res);
});

router.get('/showall', function(req, res) {
  userController.showall(req, res);
});

module.exports = router;
