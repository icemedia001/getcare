const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  question1: {
    type: [String], 
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  question3: {
    type: [String],
    required: true,
  },
  question4: {
    type: String,
    required: true,
  },
  question5: {
    type: [String],
    required: true,
  },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
