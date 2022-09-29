const express = require('express');
const router = express.Router();

// import function
const alarmController = require('../app/controllers/AlarmController');

router.get('/', alarmController.index);

module.exports = router;
