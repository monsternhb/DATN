const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Alarm = new Schema({
  subject: { type: String, required: [true, 'A Alarm must have subject']},
  time: { type: Date, default: Date.now(), select: false },
  device_id: { type: String, required: [true, 'A Alarm must have its device id']}
});

module.exports = mongoose.model('Alarm', Alarm);
