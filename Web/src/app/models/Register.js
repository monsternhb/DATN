const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Register= new Schema({
  user_name: {
      type: String,
      required: [true, 'Must have a user name'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [40, 'A user name must have less or equal then 40 characters'],
      minlength: [3, 'A user name must have more or equal then 3 characters']
  },
  pass_word: {
      type: String,
      required: [true, 'Must have a password'],
      trim: true,
      minlength: [3, 'A pass name must have more or equal then 3 characters']
  },
  role: {
    type: String,
    required: [true, 'A user must have a role'],
    enum: {
      values: ['viewer', 'operator', 'manager','admin'],
      message: 'Role is either: viewer, operator, manager'
    },
    default: 'viewer',
  },
  manager_id: String,
  
});

module.exports = mongoose.model('Register', Register);
