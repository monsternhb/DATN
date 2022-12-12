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

  // [POST] /register/store
  async store(req, res, next) {
    try{
      //get data register
      const userName = req.body.user_name;
      const passWord = req.body.pass_word;
      const confirm = req.body.confirm;
      console.log(req.body);
      //validate
      if (confirm !== passWord) throw new Error('Wrong confirm password'); 
      if (!userName || !passWord) throw new Error('May be you miss user name of pass word');     

      // check DB
      const acc = await Register.find({ user_name: userName });
      // const hasRegistered = acc[0]._doc; 
      // console.log(hasRegistered);
      console.log(acc);
      if(acc.length !== 0)  throw new Error('User name has been used');
      
      //save account to DB
      const newAcc = new Register(req.body);
      await newAcc.save();
      
      res.redirect('/register');
      console.log('save account to DB successful');

    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }
}

module.exports = new RegisterController();
