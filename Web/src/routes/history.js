const express = require('express');
const router = express.Router();

// import function
const historyController = require('../app/controllers/HistoryController');

router.post('/store',historyController.store);
router.get('/', historyController.index);

module.exports = router;
