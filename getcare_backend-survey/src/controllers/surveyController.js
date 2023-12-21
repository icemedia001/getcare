const Survey = require('../models/survey');
const getNextQuestion = (req, res) => {
  const { progress } = req.user;
  const nextQuestion = questions[progress];

  if (!nextQuestion) {
    return res.json({ message: 'Survey completed' });
  }

  res.json({ question: nextQuestion });
};
async function submitSurvey(req, res) {
  try {
    const newSurvey = new Survey({
      question1: req.body.question1,
  question2: req.body.question2,
  question3: req.body.question3,
  question4: req.body.question4,
  question5: req.body.question5,
    });
    await newSurvey.save();
    res.status(201).json({
      message: "Survey responses stored successfully"
    });
  } catch (error) {
    console.error("Error storing survey responses:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
}
module.exports = { getNextQuestion, submitSurvey };