const express = require('express');
const router = express.Router();

// import function
const supplierController = require('../app/controllers/SupplierController');
router.get('/home', supplierController.home);
router.get('/history', supplierController.history);
router.get('/register', supplierController.register);
router.get('/', supplierController.index);
module.exports = router;
