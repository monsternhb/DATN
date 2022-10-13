const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const History = require('../models/History');

class HistoryController {
  // [GET] / history
  index(req, res, next) {
    // Get data from database and render it
    History.find({})
      .then(histories => {
        res.render('history', { histories: multiMongooseToObject(histories) });
      })
      .catch(next);
  }

}

module.exports = new HistoryController();
// https://expressjs.com/en/4x/api.html#res.json
