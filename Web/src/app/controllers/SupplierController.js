const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { mongooseToObject } = require('../../helpers/mongooseHelper');

const Company = require('../models/Company');
const Register = require('../models/Register');

class SupplierController {
  // [GET] /supplier
  index(req, res, next) {
  }

  // [GET] /supplier/home
  home(req,res,next){
    res.render('supplier_home');
  }

  // [GET] /supplier/history
  history(req,res,next){
    res.render('supplier_history');
  }

  // [GET] /supplier/register
  register(req,res,next){
    res.render('supplier_register');
  }
  
}
module.exports = new SupplierController();