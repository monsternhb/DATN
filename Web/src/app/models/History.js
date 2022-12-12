const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySche = new Schema({
  num_pros: Array,
  behavior: String,
  time: { type: Date, default: Date.now(), select: false },
  // device_id: { type: String, required: [true, 'A history must have its device id'],
  //   unique: true,
  //   trim: true,    
  // }
});

const History = mongoose.model('History', HistorySche);



module.exports = History;
