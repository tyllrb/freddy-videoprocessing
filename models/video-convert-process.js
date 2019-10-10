const mongoose = require('mongoose');

const scheme = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true
  },
  exitCode: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('VideoConvertProcess', scheme);