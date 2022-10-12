const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');

class HomeController {
  // [GET] /home (viewer)
  index(req, res, next) {
    const role = req.data._doc.role;
    res.render('home', { role });
  }

  //[GET] /home/logout
  logout(req, res, next) {
    res.redirect('../');
  }
}

module.exports = new HomeController();
