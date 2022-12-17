const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');
const History = require('../models/History');
const Device = require('../models/Device');


class HomeController {
  // [GET] /home (viewer)
  

  // [GET] /home/device (has param "idDev")
  device(req,res,next){

    if (!req.session.idDev) req.session.idDev = req.query.idDev;
    if(req.query.idDev != req.session.idDev) req.session.idDev = req.query.idDev;

    const role = req.data._doc.role;
    const devId = req.session.idDev; 
    const userId = req.user;
    const userName = req.userName;
    console.log(devId);
    res.render('home',{role, devId, userId, userName });


  }


  //[GET] /home/logout
  logout(req, res, next) {
    req.session.destroy((err) => {
      res.redirect('/') // will always fire after session is destroyed
    })
  }


}

module.exports = new HomeController();
