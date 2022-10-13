const express = require('express');
const router = express.Router();

// import function
const homeController = require('../app/controllers/HomeController');
const middleWare = require('../app/middlewares/middle');

router.get('/:slug/create', homeController.createHistory);
router.get('/logout', homeController.logout);
router.get(
  '/',
  middleWare.checkLogin,
  middleWare.checkViewer,
  homeController.index
);
module.exports = router;
