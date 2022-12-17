const express = require('express');
const router = express.Router();

// import function
const homeController = require('../app/controllers/HomeController');
const middleWare = require('../app/middlewares/middle');
const UserMiddleWare = require('../app/middlewares/userMiddleware');



router.get('/logout', homeController.logout);
router.get('/device',middleWare.checkLogin,UserMiddleWare.addMore, homeController.device);
router.get(
  '/',
  middleWare.checkLogin,
  middleWare.checkViewer,
  homeController.index
);
module.exports = router;
