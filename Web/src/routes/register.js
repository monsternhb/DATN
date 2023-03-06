const express = require('express');
const router = express.Router();

// import function
const RegisterController = require('../app/controllers/RegisterController');
const middleWare = require('../app/middlewares/middle');
const userMiddleware = require('../app/middlewares/userMiddleware');


// router.delete('/device/:id',middleWare.checkLogin, CompanyController.removeDev);
// router.put('/device/:id',middleWare.checkLogin, RegisterController.updateDev);
// router.post('/device', middleWare.checkLogin, RegisterController.addNewDev);
router.get('/home', middleWare.checkLogin,userMiddleware.addMore,userMiddleware.chooseDev, RegisterController.home);
router.get('/history', middleWare.checkLogin, RegisterController.history);
router.get('/alarm', middleWare.checkLogin, RegisterController.alarm);
router.get('/device',middleWare.checkLogin, RegisterController.device);
router.get('/register', middleWare.checkLogin, RegisterController.register);
router.post('/register/save', middleWare.checkLogin, RegisterController.save);
router.get('/', middleWare.checkLogin, RegisterController.index);
module.exports = router;
