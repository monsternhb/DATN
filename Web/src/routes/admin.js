const express = require('express');
const router = express.Router();

// import function
const adminController = require('../app/controllers/AdminController');


router.post('/save', adminController.save);
router.get('/', adminController.index);

module.exports = router;
