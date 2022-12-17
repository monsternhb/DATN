const { multiMongooseToObject } = require('../../helpers/mongooseHelper');
const { listenerCount } = require('../models/History');
const History = require('../models/History');

class HistoryController {
  // [GET] / history? page == {page}
  async index(req, res, next) {
    // let perPage = 8;
    // let page = Math.max(0, req.query.page);
    // // Get data-user-device from database and render it
    // History.find({}).populate('user')
    //   .limit(perPage)
    //   .skip(perPage * page)
    //   .sort({ time: 'desc' })
    //   .then(histories => {
    //     console.log(histories);
    //     History.count().then(count => {
    //       res.render('history', {
    //         histories: multiMongooseToObject(histories),
    //         page,
    //         pages: Math.round(count / perPage),
    //       });
    //     });
    //   })
    //   .catch(next);

    try{
      //BUILD QUERY
      //query by device
      req.query.device = req.session.idDev;
      const queryObj ={...req.query};
      const excludeFields =['page','sort','limit','fields'];
      excludeFields.forEach(el => delete queryObj[el]);
      
  

      let query = History.find(queryObj);

      //SORTING
        query = query.sort({ time: 'desc' });
      //PAGINATION
      
      const page = req.query.page*1 || 1;
      const perPage = 8;
      const skip = (page -1)*perPage;
      let numPage = 1;
      if(page){
        numPage = await History.count({query});
        if (skip >= numPage ) throw new Error ('This page does not exist');
      }
      numPage = Math.ceil(numPage/perPage);

      query = query.skip(skip).limit(perPage);


      //EXCUTE QUERY
      const histories = await query;

      let pagination ={ page, numPage, perPage};

      //RENDER 
      res.render('history', { histories: multiMongooseToObject(histories) , pagination: pagination});


    }catch(err){
      res.send(err.message);
    }
  }

  // [POST] /device/:deviceId?/:userName?/:userId?
  async createHistory(req, res, next) {
    try{
    
     //alow nested routes 
     if(!req.body.device) req.body.device = req.params.deviceId;
     //from middleware
     if(!req.body.user) req.body.user = req.user;

     if(!req.body.device) req.body.device = req.params.deviceId;
     if(!req.body.user_name) req.body.user_name = req.params.userName;
  
     const newHis = new History(req.body);
     newHis.save();
    } catch (err){
      res.send(err.message);
    }
  }

  getAllHistory(req, res, next){};
  getHistorybyId(req, res, next){};
}

module.exports = new HistoryController();
// https://expressjs.com/en/4x/api.html#res.json
