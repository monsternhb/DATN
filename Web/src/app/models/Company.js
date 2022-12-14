const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
  name: {
    type: String,
    trim: true,
  },
  user_name: {
      type: String,
      required: [true, 'Must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A user name must have less or equal then 40 characters'],
      minlength: [3, 'A user name must have more or equal then 3 characters']
  },
  pass_word: {
      type: String,
      required: [true, 'Must have a password'],
      trim: true,
      maxlength: [40, 'A pass must have less or equal then 40 characters'],
      minlength: [3, 'A pass name must have more or equal then 3 characters']
  },
  device: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Device'
    }
  ]
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }

);

module.exports = mongoose.model('Company', Company);


//QUERY MIDDLEWARE
// more in tour model - js
Company.pre(/^find/,function(next){
  this.populate('device');
  next();
})
