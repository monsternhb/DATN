const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const History = require('../models/History');

class HistoryController {
  // [GET] / history? page == {page}
  index(req, res, next) {
    let perPage = 8;
    let page = Math.max(0, req.query.page);
    // Get data from database and render it
    History.find({})
      .limit(perPage)
      .skip(perPage * page)
      .sort({ time: 'desc' })
      .then(histories => {
        History.count().then(count => {
          res.render('history', {
            histories: multiMongooseToObject(histories),
            page,
            pages: Math.round(count / perPage),
          });
        });
      })
      .catch(next);
  }

  // [POST] /history/store
  store(req, res, next) {
    const newHis = new History(req.body);
    
    newHis
      .save()
      .then(() => {
        res.redirect('/home');
      })
      .catch(err => res.send('Error:', err));
  }
}

module.exports = new HistoryController();
// https://expressjs.com/en/4x/api.html#res.json
