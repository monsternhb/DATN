const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Register = require('../models/Register');
const Device = require('../models/Device');

class RegisterController {

  // [GET] / register
  async index(req, res, next) {
    const role = req.data._doc.role;
    const company = req.name;
    const devs = req.devices;
    
    let devTable = await Device.find({company:req.user});
    if (devTable)
    devTable =  multiMongooseToObject(devTable);



    Register.find({})
      .then(registers => {
        res.render('register', { registers: multiMongooseToObject(registers), role, company, devices: devs , devTable});
      })
      .catch(next);
  }

  // [POST] /register/store
  async store(req, res, next) {
    try{
      //get data register
      const userName = req.body.user_name;
      const passWord = req.body.pass;
      const confirm = req.body.confirm;

    
       //alow nested routes 
     if(!req.body.devices) req.body.devices = req.devices;
     //from middleware
     if(!req.body.name) req.body.name = req.name;


      //validate
      if (confirm !== passWord) throw new Error('Wrong confirm password'); 
      if (!userName || !passWord) throw new Error('May be you miss user name or pass word');     

      // check DB
      const acc = await Register.find({ user_name: userName });
      // const hasRegistered = acc[0]._doc; 
      // console.log(hasRegistered);
      console.log(acc);
      if(acc.length !== 0)  throw new Error('User name has been used');
      
      //save account to DB
      // const newAcc = new Register(req.body);
      // await newAcc.save();

      const newAcc = await Register.create(req.body);
      
      
      res.redirect('/register');
      console.log('save account to DB successful');
      
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }
}

module.exports = new RegisterController();
