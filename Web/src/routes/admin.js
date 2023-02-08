const express = require('express');
const router = express.Router();

// import function
const adminController = require('../app/controllers/AdminController');
router.post('/save', adminController.save);
router.get('/home', adminController.home);
router.get('/history', adminController.history);
router.get('/register', adminController.register);
router.get('/', adminController.index);

module.exports = router;
