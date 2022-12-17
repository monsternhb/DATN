const jwt = require('jsonwebtoken');
const Register = require('../models/Register');

class UserMiddleware {
  // middleware detail user
  addMore(req, res, next) {

    // id DB of dev
  

    next();
  }
    
}
module.exports = new UserMiddleware();
