const express = require('express');
const router = express.Router();

// import function
const registerController = require('../app/controllers/RegisterController');

router.post('/store', registerController.store);
router.get('/', registerController.index);

module.exports = router;
