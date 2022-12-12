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
  async store(req, res, next) {
    try{
     const newHis = new History( {behavior: req.body.behavior});
     newHis.save();



    //  newHis.behavior = req.body.behavior;
      
    

      // const newHis = await History.create([{ behavior: 'Jean-Luc Picard' }]);
      // console.log(newHis,'aaaa');
    } catch (err){
      res.send(err.message);
    }
  }
}

module.exports = new HistoryController();
// https://expressjs.com/en/4x/api.html#res.json
