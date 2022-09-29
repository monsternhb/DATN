const mongoose = require('mongoose');

const connect = async function () {
  try {
    // connect to database
    await mongoose.connect('mongodb://localhost:27017/HCMUT_DATN');
    console.log('oke');
  } catch (err) {
    console.log('not oke');
  }
};

module.exports = { connect };

//https://github.com/Automattic/mongoose
