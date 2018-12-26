var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var userController = require('../controllers/users');
var verifyToken = require('../middleware');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', function(req, res, next) {
  userController.register(req, res, next);
});

router.post('/login', function(req, res, next) {
  userController.login(req, res, next);
});

// For Debug purposes
router.get('/info', verifyToken, function(req, res, next) {
  userController.info(req, res, next);
});

router.get('/dropall', function(req, res, next) {
  userController.dropall(req, res, next);
});

router.get('/showall', function(req, res, next) {
  userController.showall(req, res, next);
});

module.exports = router;
