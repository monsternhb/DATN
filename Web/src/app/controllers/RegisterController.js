const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Register = require('../models/Register');

class RegisterController {
  // [GET] / register
  index(req, res, next) {
    Register.find({})
      .then(registers => {
        res.render('register', { registers: multiMongooseToObject(registers) });
      })
      .catch(next);
  }

  // [POST] account
  store(req, res, next) {
    console.log(req.body);
    const userName = req.body.user_name;
    const passWord = req.body.pass_word;
    const confirm = req.body.confirm;

    if (confirm !== passWord) {res.json('Wrong confirm password'); }

    Register.find({ user_name: userName })
      .then(acc => {
          {acc: mongooseToObject(acc)}; 
          console.log('acc',acc);   
          if (acc) console.log('Account has been used!!');
          throw 'Account has been used!!';
        }
      )
      .catch(next);

    if (!userName || !passWord)
      {
        console.log('May be you miss user name of pass word');
        throw 'May be you miss user name of pass word';
      }

    const newAcc = new Register(req.body);
    newAcc
      .save()
      .then(() => {
        console.log('save to DB successful');
        res.redirect('../register');
      })
      .catch(err => res.send('Error:',err));
  }
}

module.exports = new RegisterController();
