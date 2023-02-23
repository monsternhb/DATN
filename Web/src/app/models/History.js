const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySche = new Schema({
  num_pros: Array,
  behavior: String,
  time: { type: Date, default: Date.now()},

  deviceID:{
    type: mongoose.Schema.ObjectId,
    ref: 'Device',
    required: [true, 'Must belong a device']
  },
  
});

const History = mongoose.model('History', HistorySche);
module.exports = History;





//MIDDLE WARE
HistorySche.pre(/^find/, function(next){
  this.populate({
    path:'deviceID',
  })
  next();
})


