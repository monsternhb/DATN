const { mongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');

class RegisterController {
  // [GET] / register
  index(req, res) {
    res.render('register');
  }

  // [POST] account
  store(req, res, next) {
    console.log(req.body);
    const acc = new Register(req.body);
    acc
      .save()
      .then(() => {
        console.log('save to DB successful');
        res.redirect('../register');
      })
      .catch(err => res.send(err));
  }
}

module.exports = new RegisterController();
