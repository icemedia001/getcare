const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['checkbox', 'radio', 'textbox'], required: true },
  options: { type: [String], required: true },
  userResponses: [
    {
      selectedOptions: { type: [String], required: true },
    },
  ],
  score: { type: Number, default: 0},
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
