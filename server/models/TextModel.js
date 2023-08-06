const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const TextModel = mongoose.model('Text', textSchema);

module.exports = TextModel;
