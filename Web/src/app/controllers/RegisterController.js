const { mongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');

class RegisterController {
  // [GET] / history
  index(req, res) {
    res.render('register');
  }

  // [GET] / history / : slug
  show(req, res) {}

  // [POST] account
  store(req, res, next) {
    const acc = new Register(req.body);
    acc.save(err => {
      if (err) res.send('Error save Account to DB');
      res.send('Save acc success');
    });
  }
}

module.exports = new RegisterController();
