const express = require('express');
const router = express.Router();

// import function
const supplierController = require('../app/controllers/SupplierController');
const middleWare = require('../app/middlewares/middle');
const UserMiddleWare = require('../app/middlewares/userMiddleware');

router.get('/device', supplierController.device);
router.post('/device', middleWare.checkLogin, supplierController.addNewDev);
router.get('/home', middleWare.checkLogin,supplierController.home);
router.get('/history', supplierController.history);
router.get('/register', supplierController.register);
router.get('/', supplierController.index);
module.exports = router;
