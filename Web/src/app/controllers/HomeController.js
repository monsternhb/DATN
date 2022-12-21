const { multiMongooseToObject, mongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');
const History = require('../models/History');
const Device = require('../models/Device');


class HomeController {
  // [GET] /home (viewer)

  // [GET] /home/device (has param "idDev")
  async device(req,res,next){

    if (!req.session.idDev) req.session.idDev = req.query.idDev;
    if(req.query.idDev != req.session.idDev) req.session.idDev = req.query.idDev;

    const role = req.data._doc.role;
    const devId = req.session.idDev; 
    const userId = req.user;
    const userName = req.userName;
    
    const dev = await Device.findById(devId);
    const devIpAdd = mongooseToObject(dev);
    if (!req.session.ipDev) req.session.ipDev = devIpAdd;
    if(devIpAdd != req.session.ipDev) req.session.ipDev = devIpAdd;


    const devIp = req.session.ipDev;


    res.render('home',{role, devId, userId, userName, devIp});


  }


  //[GET] /home/logout
  logout(req, res, next) {
    req.session.destroy((err) => {
      res.redirect('/') // will always fire after session is destroyed
    })
  }


}

module.exports = new HomeController();
