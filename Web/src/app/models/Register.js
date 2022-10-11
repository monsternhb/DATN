const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Register = new Schema({
  //read more at document
  user_name: String,
  pass_word: String,
  role: { type: String, default: 'viewer' },
});

module.exports = mongoose.model('Register', Register);
