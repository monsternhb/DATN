const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Device = require('../models/Device');




class DeviceController {
    // [GET] / device
    // index(req, res, next) {
    //   Company.find({})
    //   .then(acc => {
    //     res.render('admin', { acc: multiMongooseToObject(acc)});
    //   })
    //   .catch(next);
    // }
    
    // [POST] /device/save

    async save(req, res, next) {
      try{
        //get data register
        const name = req.body.name;
        const ip = req.body.ip_add;
        const companyId = req.user;
  
        // check DB
        // const acc = await Company.find({ user_name: userName });
        // const hasRegistered = acc[0]._doc; 
        // console.log(hasRegistered);
        // if(acc.length !== 0)  throw new Error('User name has been used');
        
        //save account to DB
        // const newAcc = new Register(req.body);
        // await newAcc.save();
  
        const newDev = new Device( {name, ip_add: ip, company: companyId });
        newDev.save();

        
        
        res.redirect('/register');
        console.log('save device to DB successful');
        
      }catch(err){
        console.log(err.message);
        res.json(err.message);
      }
    }
  
  }
  
  module.exports = new DeviceController();