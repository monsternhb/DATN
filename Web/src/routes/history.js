const express = require('express');
const router = express.Router();

// import function
const historyController = require('../app/controllers/HistoryController');

// :slug match with search bar
router.get('/:slug', historyController.show);
router.get('/', historyController.index);
module.exports = router;
