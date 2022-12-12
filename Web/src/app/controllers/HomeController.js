const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const Register = require('../models/Register');
const jwt = require('jsonwebtoken');
const History = require('../models/History');

class HomeController {
  // [GET] /home (viewer)
  index(req, res, next) {
    const role = req.data._doc.role;
    res.render('home', { role });
  }

  //[GET] /home/logout
  logout(req, res, next) {
    res.redirect('../');
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
