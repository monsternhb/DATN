const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const History = require('../models/History');

class HistoryController {
  // [GET] / history? page == {page}
  index(req, res, next) {
    let perPage = 8;
    let page = Math.max(0, req.query.page);
    // Get data-user-device from database and render it
    History.find({}).populate('user')
      .limit(perPage)
      .skip(perPage * page)
      .sort({ time: 'desc' })
      .then(histories => {
        console.log(histories);
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

  // [POST] /history/device/:deviceId
  async createHistory(req, res, next) {
    try{
    
     //alow nested routes 
     if(!req.body.device) req.body.device = req.params.deviceId;
     //from middleware
     if(!req.body.user) req.body.user = req.user;
    


     const newHis = new History( {behavior: req.body.behavior, user : req.body.user });
     newHis.save();
    //  newHis.behavior = req.body.behavior;
      // const newHis = await History.create([{ behavior: 'Jean-Luc Picard' }]);
      // console.log(newHis,'aaaa');
    } catch (err){
      res.send(err.message);
    }
  }

  getAllHistory(req, res, next){};
  getHistorybyId(req, res, next){};
}

module.exports = new HistoryController();
// https://expressjs.com/en/4x/api.html#res.json
