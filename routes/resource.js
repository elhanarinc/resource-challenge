var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var resourceController = require('../controllers/resource');
var verifyToken = require('../middleware');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/insert', verifyToken, function(req, res, next) {
  resourceController.insert(req, res, next);
});

router.get('/drop', function(req, res, next) {
  resourceController.drop(req, res, next);
});

router.get('/show', function(req, res, next) {
  resourceController.show(req, res, next);
});

module.exports = router;
