const express = require('express');
const router = express.Router();

// import function
const registerController = require('../app/controllers/RegisterController');
const middleWare = require('../app/middlewares/middle');

router.post('/store', registerController.store);
router.get(
  '/',
  middleWare.checkLogin,
  middleWare.checkManager,
  middleWare.checkAdmin,
  registerController.index
);

module.exports = router;
