const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Alarm = new Schema({
  subject: { type: String, required: [true, 'A Alarm must have subject']},
  device:{
    type: mongoose.Schema.ObjectId,
    ref: 'Device',
    required: [true, 'Must belong a device']
  },
  
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'Register',
    required: [true, 'Must belong a user']
  },
  
  time: { type: Date, default: Date.now(), select: false }
});

module.exports = mongoose.model('Alarm', Alarm);


Alarm.pre(/^find/, function(next){
  this.populate({
    path:'device',
  }).populate({
    path:'user',
    select:'user_name'
  })

  next();
})