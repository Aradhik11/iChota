const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
  },
  fullName: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);