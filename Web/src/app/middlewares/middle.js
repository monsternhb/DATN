const jwt = require('jsonwebtoken');
const Register = require('../models/Register');

class Middleware {
  // middleware checkLogin
  async checkLogin(req, res, next) {
    try {
      // get token from cookies
      let token = req.cookies.token;
      // decode token
      const decodeToken = await jwt.verify(token, 'pass');

      // check acc
      const accArr = await Register.find({ _id: decodeToken._id });
      if (accArr.length === 0) return res.redirect('/');

      // authorization
      const role = String(accArr[0].role);
      if (!role) return res.redirect('/');

      req.data = accArr[0];
      //send user to client
      req.user = req.data.id;

      //user name 
      req.userName = req.data.user_name;

      // list devices []
      req.devices = req.data.devices;
      
      // company name
      req.name = req.data.name;

      next();
    } catch (err) {
      res.json(err.message);
    }
  }

  checkViewer(req, res, next) {
    const role = req.data._doc.role;
    if (role === 'viewer' || role === 'operator' || role === 'manager' || role === 'admin') {
      req.data = req.data;
      next();
    } else {
      res.json('NOT PERMISSION!!!');
    }
  }

  checkOperator(req, res, next) {
    const role = req.data._doc.role;
    if (role === 'operator' || role === 'manager' || role === 'admin') next();
    else {
      res.json('NOT PERMISSION!!!');
    }
  }

  checkManager(req, res, next) {
    const role = req.data._doc.role;
    if (role === 'manager'|| role === 'admin') {
      req.data = req.data;
      next();
    }
    else {
      res.json('NOT PERMISSION!!!');
    }
  }

  checkAdmin(req, res, next) {
    const role = req.data._doc.role;
    if (role === 'admin') next();
    else {
      res.json('NOT PERMISSION!!!');
    }
  }
}
module.exports = new Middleware();
