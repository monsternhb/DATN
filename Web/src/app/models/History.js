const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', History);
