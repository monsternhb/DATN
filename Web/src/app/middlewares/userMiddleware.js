const jwt = require('jsonwebtoken');
const Register = require('../models/Register');

class UserMiddleware {
  // middleware detail user
  addMore(req, res, next) {
    // 1. fix admin allocate dev/ update
    if(req.session.idDev){
      if (!req.query.idDev)
      req.query.idDev = req.session.idDev;
    }
    next();
  }  
}
module.exports = new UserMiddleware();
