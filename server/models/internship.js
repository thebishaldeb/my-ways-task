var mongoose = require('mongoose');

var InternshipSchema = mongoose.Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Internship = mongoose.model('Internship', InternshipSchema);

module.exports = { Internship };
