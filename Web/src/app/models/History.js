const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
  time: { type: Date, default: Date.now },
  subject_name: { type: String },
  alarm: { type: String },
  sum_high: String,
  sum_normal: String,
  sum_short: String,
  behavior: String,
});

module.exports = mongoose.model('History', History);
