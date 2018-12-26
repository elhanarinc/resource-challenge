var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var userController = require('../controllers/users');
var verifyToken = require('../middleware');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
  userController.register(req, res);
});

router.post('/login', function(req, res) {
  userController.login(req, res);
});

// For Debug purposes
router.get('/info', verifyToken, function(req, res) {
  userController.info(req, res);
});

router.get('/dropall', function(req, res) {
  userController.dropall(req, res);
});

router.get('/showall', function(req, res) {
  userController.showall(req, res);
});

module.exports = router;
