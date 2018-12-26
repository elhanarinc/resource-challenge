require('dotenv').config();
var jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({'auth': false, 'result': 'no token provided'});
  }
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(500).json({'auth': false, 'result': 'failed to authenticate token'});
    }
    req.userid = decoded.id;
    next();
  });
}
module.exports = verifyToken;
