const express = require('express');
const router = express.Router();

// import function
const supplierController = require('../app/controllers/SupplierController');
const middleWare = require('../app/middlewares/middle');
const userMiddleware = require('../app/middlewares/userMiddleware');
const UserMiddleWare = require('../app/middlewares/userMiddleware');

router.delete('/device/:id',middleWare.checkLogin, supplierController.removeDev);
router.put('/device/:id',middleWare.checkLogin, supplierController.updateDev);
router.post('/device', middleWare.checkLogin, supplierController.addNewDev);
router.get('/home', middleWare.checkLogin,userMiddleware.addMore,userMiddleware.chooseDev,supplierController.home);
router.get('/history', middleWare.checkLogin, supplierController.history);
router.get('/alarm', middleWare.checkLogin, supplierController.alarm);
router.get('/device',middleWare.checkLogin, supplierController.device);
router.get('/register', middleWare.checkLogin, supplierController.register);
router.post('/register/save', middleWare.checkLogin, supplierController.save);
router.get('/', middleWare.checkLogin,supplierController.index);
module.exports = router;
