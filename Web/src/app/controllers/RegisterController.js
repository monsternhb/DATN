const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Company = require('../models/Company');
const Unit = require('../models/Unit');
const Register = require('../models/Register');
const Device = require('../models/Device');
const { Namespace } = require('socket.io');


class RegisterController {

  // [GET] /company
  index(req, res, next) {
  }
  
  // [GET] /register/home
  async home(req,res,next){
      try{       
        //get user id
        const userId = req.userId;
        const role =req.role;
        const userName = req.userName;
        // alert current device
        const devIp = req.query.ipDev;
        
        //RENDER 
        res.render('home',{role, userId, userName, devIp});
      }catch(err){
        res.send(err.message);
      }
  }
  
  // [GET] /register/device
  async device(req, res, next) {
    try{
      const role =req.role;
      const unitId = req.unitID;
      //get information of device 
      let objDev = [];
      const data = await Device.find({unitID: unitId});  
      if (data.length != 0) {
          data.forEach((dev, index) =>{
            objDev[index] = {};
            objDev[index].name = dev.name;
            objDev[index].id = dev.id;
            objDev[index].ip = dev.ip_add;     
          })
        };
      res.render('device', { role, objDev });
    }
    catch(err){
      res.send(err.message);
    }
  }


  // [GET] /supplier/history
  history(req,res,next){
    const role =req.role;
    const devIp = req.session.ipDev;
    // waiting 
    res.render('supplier_history',{role,devIp});
  }

  // [GET] /supplier/alarm
  alarm(req,res,next){
    const role =req.role;
    const devIp = req.session.ipDev;
    // waiting
    res.render('supplier_alarm',{role,devIp});
  }

  // [GET] /register/register
  register(req,res,next){
    const role = req.role;
    const devIp = req.session.ipDev;
    //should add find by ID company
    //from middleware
    
    Register.find({unitID: req.unitID})
      .then(registers => {
        res.render('unit_register', { registers: multiMongooseToObject(registers), role,devIp});
      })
  }

  // [POST] /register/register/save
  async save(req,res,next){
    try{
      const role = req.role;
      //get data register
      const userName = req.body.user_name;
      const passWord = req.body.pass;
      const confirm = req.body.confirm;

      //from middleware
      if(!req.body.name) req.body.name = req.name;
      //from middleware
      if(!req.body.unitID) req.body.unitID = req.unitID;
      //get companyId
      if(!req.body.companyID) req.body.companyID = req.companyID;
      

      //validate
      if (confirm !== passWord) throw new Error('Wrong confirm password'); 
      if (!userName || !passWord) throw new Error('May be you miss user name or pass word');     

      // check DB
      const acc = await Register.find({ user_name: userName });
      if(acc.length !== 0)  throw new Error('User name has been used');
      // save acc of company
      const newAcc = await Register.create(req.body);
      
      res.redirect('/register/register');
      console.log(`save account of new user in ${req.name}to DB successful`);
      
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }


  // [PUT] /admin/device/:id
  async updateDev(req,res,next){
    try{
      const idDev = req.params.id;
      await Device.findByIdAndUpdate({_id:idDev}, req.body );
      console.log('update a device success');
      res.redirect('/admin/home');
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }
  
}
module.exports = new RegisterController();