const express = require('express');
const router = express.Router();

// import function
const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.index);
module.exports = router;
