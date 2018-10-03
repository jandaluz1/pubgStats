const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true
  },
  discordUsername: {
    type: String,
    required: true
  },
  pubgName: String,
  pubgAccountId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
