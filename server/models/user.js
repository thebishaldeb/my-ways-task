var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  internships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
