const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');

class HomeController {
  // [GET] / home
  async index(req, res, next) {
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

      res.render('home');
    } catch (err) {
      res.json('You need to login before');
    }
  }
}

module.exports = new HomeController();
