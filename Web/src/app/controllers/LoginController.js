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
        pass: passWord,
      });

      if (!acc) throw new Error('Incorrect username.');

      // if(!acc)   return done(null, false, { message: 'Incorrect username.' });

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
      
      //check admin 
      const role = acc._doc.role;
      if (role === 'admin') res.redirect('../admin');
      else 
      res.redirect('../home');
    } catch (err) {
      console.log(err);
      res.json(err.message);
    }
  }
}

module.exports = new LoginController();
// https://expressjs.com/en/4x/api.html#res.json
