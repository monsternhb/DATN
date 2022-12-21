const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema({
  name: { type: String, required: [true, 'A Device must have a name']},
  time: { type: Date, default: Date.now(), select: false },
  
  ip_add: {type: String, required: [true, 'A Device must have its device ip address'],
    trim: true,},

  company:{
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
  }


  // histories - alarms
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  });

module.exports = mongoose.model('Device', Device);
//QUERY MIDDLEWARE
Device.pre(/^find/, function(next){
  this.populate({
    path:'company',
    select: 'name'
  })
})

// Virtual populate --- when have 1 device - not all
// get all history of the device
Device.virtual('histories',{
  ref:'History',
  foreignField: 'device',
  localField: '_id'
})

Device.virtual('alarms',{
  ref:'Alarm',
  foreignField: 'device',
  localField: '_id'
})

// go to controller "find by iD. populate('alarms')"
