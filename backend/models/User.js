const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/
    },
    course: { type: String, required: true },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    role: { type: String, enum: ['admin', 'student'] }
  }, {
    timestamps: true
  });
  
  // Remove password from JSON output
  userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
  };
  
  module.exports = mongoose.model('User', userSchema);