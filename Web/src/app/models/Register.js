const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Register = new Schema({
  //read more at document
  username: '',
  pass: '',
});

module.exports = mongoose.model('Register', Register);
