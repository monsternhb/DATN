const express = require('express');
const router = express.Router();

// import function
const registerController = require('../app/controllers/RegisterController');
const middleWare = require('../app/middlewares/middle');

router.post('/store',middleWare.checkLogin, registerController.store);
router.get(
  '/',
  middleWare.checkLogin,
  middleWare.checkManager,
  registerController.index
);

module.exports = router;
