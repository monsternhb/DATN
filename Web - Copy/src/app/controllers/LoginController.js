const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');

class LoginController {
  // [GET] /
  index(req, res, next) {
    res.render('login');
  }

  // [POST] /login
  async auth(req, res, next) {
    // Authentication
    try {
      const userName = req.body.user_login;
      const passWord = req.body.pass_login;

      const acc = await Register.findOne({
        user_name: userName,
        pass_word: passWord,
      });

      // if (!acc) throw new Error('Fail when login');

      if(!acc)   return done(null, false, { message: 'Incorrect username.' });

      console.log(acc, 'Login success!!');
      let token = jwt.sign({ _id: acc._id }, 'pass');

      let data = {
        message: 'Login success',
        token: token,
      };

      if (data.message !== 'Login success')
        throw new Error('Fail login message');

      // save cookies
      res.cookie('token', data.token, 2);
      res.redirect('../home');
    } catch (err) {
      res.json('PLEASE LOGIN AGAIN!!');
    }
  }
}

module.exports = new LoginController();
// https://expressjs.com/en/4x/api.html#res.json
