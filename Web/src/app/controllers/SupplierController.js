const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Company = require('../models/Company');
const Register = require('../models/Register');
const Device = require('../models/Device');
const { Namespace } = require('socket.io');


class SupplierController {

  // [GET] /supplier
  index(req, res, next) {
  }
  
  // [GET] /supplier/home
  async home(req,res,next){
      try{
        
        const role =req.role;
        const queryObj ={...req.query};
        const excludeFields =['page','sort','limit','fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        
    
  
        let query = Device.find(queryObj);
  
        //SORTING
          query = query.sort({ time: 'desc' });
        //PAGINATION
        
        // const page = req.query.page*1 || 1;
        // const perPage = 8;
        // const skip = (page -1)*perPage;
        // let numPage = 1;
        // if(page){
        //   numPage = await Device.count({query});
        //   if (skip >= numPage ) throw new Error ('This page does not exist');
        // }
        // numPage = Math.ceil(numPage/perPage);
  
        // query = query.skip(skip).limit(perPage);
  
  
        //EXCUTE QUERY
        const devices = await query;
  
        // let pagination ={ page, numPage, perPage};

        // get data of companies
        const companies = await Company.find();
        
        // alert current device
        const devIp = req.query.ipDev;
    
        //RENDER 
        res.render('supplier_home', { devices: multiMongooseToObject(devices), companies: multiMongooseToObject(companies), role, devIp });
      }catch(err){
        res.send(err.message);
      }
  }
  
  // [GET] /supplier/device
  async device(req, res, next) {
    try{
      const role =req.role;
      //get information of device 
      let objDev = [];
      const data = await Device.find();  
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

  // [POST] /supplier/device
  async addNewDev(req, res, next) {
    try{
      //get data of dev
      const name = req.body.name;
      const ipAdd = req.body.ip_add;
      const seriesNum = req.body.series_number;

    
     //from middleware
     if(!req.body.supplierID) req.body.supplierID = req.userId;
    
     //validate
     //save to DB
     const newDev = await Device.create(req.body);

     res.redirect('/supplier/home');
     console.log('save device to DB successful');
      
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }

  // [GET] /supplier/register
  register(req,res,next){
    const role = req.role;
    const devIp = req.session.ipDev;
    Company.find({})
      .then(registers => {
        res.render('supplier_register', { registers: multiMongooseToObject(registers), role,devIp});
      })
  
  }

  // [POST] /supplier/register/save
  async save(req,res,next){
    try{
      const role = req.role;
      //get data register
      const userName = req.body.user_name;
      const passWord = req.body.pass;
      const confirm = req.body.confirm;

      //from middleware
      if(!req.body.name) req.body.name = req.name;

      //validate
      if (confirm !== passWord) throw new Error('Wrong confirm password'); 
      if (!userName || !passWord) throw new Error('May be you miss user name or pass word');     

      // check DB
      const acc = await Company.find({ user_name: userName });
      if(acc.length !== 0)  throw new Error('User name has been used');
      // save acc of company
      const newAcc = await Company.create(req.body);
      
      res.redirect('/supplier/register');
      console.log('save account of new company to DB successful');
      
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }

  // [DELETE] /supplier/device/:id
  async removeDev(req,res,next){
    try{
      const idDev = req.params.id;
      await Device.findByIdAndDelete(idDev);
      console.log('delete a device success');
      res.json("delete a device success");
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }

  // [UPDATE] /supplier/device/:id
  async updateDev(req,res,next){
    try{
      const idDev = req.params.id;
      await Device.findByIdAndUpdate({_id:idDev}, req.body );
      console.log('update a device success');
      res.redirect('/supplier/home');
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }
  
}
module.exports = new SupplierController();