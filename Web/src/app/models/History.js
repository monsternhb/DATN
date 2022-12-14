const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySche = new Schema({
  num_pros: Array,
  behavior: String,
  time: { type: Date, default: Date.now(), select: false },

  // device:{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Device',
  //   required: [true, 'Must belong a device']
  // },

  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'Register',
    required: [true, 'Must belong a user']
  }

});

const History = mongoose.model('History', HistorySche);





//MIDDLE WARE
HistorySche.pre(/^find/, function(next){
  // this.populate({
  //   path:'device',
  // })
  this.populate({
    path:'user',
    // select:'user_name'
  })
  next();
})

// POST /device/de-id/histories
// luu history
// GET /device/de-id/histories
// lay all history of 1 dev
// GET /device/de-id/histories/his-id
// filter history

module.exports = History;