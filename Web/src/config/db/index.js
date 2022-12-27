const mongoose = require('mongoose');

const connect = async function () {
  try {
    // connect to database
    await mongoose.connect('mongodb://localhost:27017/DATN');
    console.log('connect DB successful');
  } catch (err) {
    console.log('error when connect DB');
  }
};

module.exports = { connect };
