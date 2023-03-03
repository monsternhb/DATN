const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Company = require('../models/Company');
const Unit = require('../models/Unit');
const Register = require('../models/Register');
const Device = require('../models/Device');
const { Namespace } = require('socket.io');


class CompanyController {

  // [GET] /company
  index(req, res, next) {
  }
  
  // [GET] /company/home
  async home(req,res,next){
      try{       
        //get company id
        const companyId = req.userId;

        const role =req.role;
        const queryObj ={...req.query};
        const excludeFields =['page','sort','limit','fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        
        //edit findById
        let query = Device.find({companyID: companyId});
  
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

        // get data of unit
        const units = await Unit.find({companyID: companyId});
        
        // alert current device
        const devIp = req.query.ipDev;
    
        //RENDER 
        res.render('company_home', { devices: multiMongooseToObject(devices), units: multiMongooseToObject(units), role, devIp });
      }catch(err){
        res.send(err.message);
      }
  }
  
  // [GET] /company/device
  async device(req, res, next) {
    try{
      const role =req.role;
      const companyId = req.userId;
      //get information of device 
      let objDev = [];
      const data = await Device.find({companyID: companyId});  
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
  // async addNewDev(req, res, next) {
  //   try{
  //     //get data of dev
  //     const name = req.body.name;
  //     const ipAdd = req.body.ip_add;
  //     const seriesNum = req.body.series_number;

    
  //    //from middleware
  //    if(!req.body.supplierID) req.body.supplierID = req.userId;
    
  //    //validate
  //    //save to DB
  //    const newDev = await Device.create(req.body);

  //    res.redirect('/supplier/home');
  //    console.log('save device to DB successful');
      
  //   }catch(err){
  //     console.log(err.message);
  //     res.json(err.message);
  //   }
  // }

  // [GET] /company/register
  register(req,res,next){
    const role = req.role;
    const devIp = req.session.ipDev;
    //should add find by ID company
    //from middleware
    if(!req.companyID) req.companyID = req.userId;
    Unit.find({companyID: req.companyID})
      .then(registers => {
        res.render('company_register', { registers: multiMongooseToObject(registers), role,devIp});
      })
  
  }

  // [POST] /company/register/save
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
      if(!req.body.companyID) req.body.companyID = req.userId;

      //validate
      if (confirm !== passWord) throw new Error('Wrong confirm password'); 
      if (!userName || !passWord) throw new Error('May be you miss user name or pass word');     

      // check DB
      const acc = await Unit.find({ user_name: userName });
      if(acc.length !== 0)  throw new Error('User name has been used');
      // save acc of company
      const newAcc = await Unit.create(req.body);
      
      res.redirect('/company/register');
      console.log(`save account of new unit in ${req.name}to DB successful`);
      
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }

  // [DELETE] /supplier/device/:id
  // async removeDev(req,res,next){
  //   try{
  //     const idDev = req.params.id;
  //     await Device.findByIdAndDelete(idDev);
  //     console.log('delete a device success');
  //     res.json("delete a device success");
  //   }catch(err){
  //     console.log(err.message);
  //     res.json(err.message);
  //   }
  // }

  // [PUT] /company/device/:id
  async updateDev(req,res,next){
    try{
      const idDev = req.params.id;
      await Device.findByIdAndUpdate({_id:idDev}, req.body );
      console.log('update a device success');
      res.redirect('/company/home');
    }catch(err){
      console.log(err.message);
      res.json(err.message);
    }
  }
  
}
module.exports = new CompanyController();