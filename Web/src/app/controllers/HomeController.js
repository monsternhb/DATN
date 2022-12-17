const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');
const History = require('../models/History');
const Device = require('../models/Device');


class HomeController {
  // [GET] /home (viewer)
  async index(req, res, next) {
    try{
      const role = req.data._doc.role;
      const devs = req.devices;
      let devsArr = [...devs];
      
      // get information of device 
      let objDev = [];
      devsArr.forEach( async function(dev,index) {
        const data = await Device.find({ip_add:dev});
          const inform = data[0];
          objDev[index] = {};
          objDev[index].name = inform.name;
          objDev[index].id = inform.id;
          objDev[index].ip = inform.ip_add;     
      });

      
      console.log (objDev,'xxxx');
      //get data of devices
  
  
      // dev = { { name , ip, id }}
  
      res.render('device', { role, objDev });

    }
    catch(err){
      res.send(err.message);
    }
  }

  // [GET] /home/device (has param "idDev")
  device(req,res,next){

    if (!req.session.idDev) req.session.idDev = req.query.idDev;
    const role = req.data._doc.role;
    // get id
    const devId = req.session.idDev; 
    const userId = req.user;
    const userName = req.userName;

    res.render('home',{role, devId, userId, userName });


  }


  //[GET] /home/logout
  logout(req, res, next) {
    req.session.destroy((err) => {
      res.redirect('/') // will always fire after session is destroyed
    })
  }

  // [GET] / home /:slug /create
  async createHistory(req, res, next) {
    const newBehavior = 'Click ' + req.params.slug + ' from Web client';
    console.log(newBehavior,'aaaaa');
    //creat new history when click on web client
    await History.create({ behavior: newBehavior })
      .then(data => {
        res.redirect('../');
      })
      .catch(next);
  }
}

module.exports = new HomeController();
