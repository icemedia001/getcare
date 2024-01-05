const Question = require("../models/questions");
const responseController = {
  saveResponse: async (req, res) => {
    const { questionId } = req.params;
    const { userId, selectedOptions } = req.body;
    try {
      const question = await Question.findById(questionId);
      if(!question) {
        return res.status(404).json({
          message: "Question not found"
        });
      }
      question.userResponses.push({
        userId, selectedOptions
      });
      const score = calculateScore(question.userResponses);
      question.score = score;
      await question.save();
      res.status(201).json({
        message: "Response saved successfully",
        score
      });
    } catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  },
};

const calculateScore = () => {
  const minScore = 0;
  const maxScore = 100;
  const randomScore = Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
  return randomScore;
};
module.exports = responseController;