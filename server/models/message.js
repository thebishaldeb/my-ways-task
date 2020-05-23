var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema(
  {
    content: String,
    sender: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
