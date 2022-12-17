const express = require('express');
const router = express.Router();

// import function
const historyController = require('../app/controllers/HistoryController');
const middleWare = require('../app/middlewares/middle');



router.post('/device/:deviceId?/:userName?/:userId?',middleWare.checkLogin,historyController.createHistory);
router.get('/device/:deviceId/',historyController.getAllHistory);
router.get('/device/:deviceId/:hisId',historyController.getHistorybyId);
// router.post('/store',historyController.store);
router.get('/:page?',historyController.index);


// POST /device/de-id/histories
// luu history
// GET /device/de-id/histories
// lay all history of 1 dev
// GET /device/de-id/histories/his-id
// filter history
module.exports = router;
