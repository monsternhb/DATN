const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySche = new Schema({
  num_pros: Array,
  behavior: String,
  time: { type: Date, default: Date.now()},

  device:{
    type: mongoose.Schema.ObjectId,
    ref: 'Device',
    required: [true, 'Must belong a device']
  },

  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'Register',
    required: [true, 'Must belong a user']
  },
  
  user_name: {
    type: String
  }
});

const History = mongoose.model('History', HistorySche);
module.exports = History;





//MIDDLE WARE
HistorySche.pre(/^find/, function(next){
  this.populate({
    path:'device',
  }).populate({
    path:'user',
    // select:'user_name'
  })
  next();
})


