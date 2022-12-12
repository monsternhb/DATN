const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema({
  name: { type: String, required: [true, 'A Device must have a name']},
  time: { type: Date, default: Date.now(), select: false },
  ip_add: 
  { type: String, required: [true, 'A Device must have its device ip address'],
    unique: true,
    trim: true,},
});

module.exports = mongoose.model('Device', Device);
