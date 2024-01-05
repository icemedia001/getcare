const Question = require('../models/questions');

const questionController = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createQuestion: async (req, res) => {
    const predefinedSurveyQuestions = [
        {
            text: 'How do you want to use GetCare?',
            type: "checkbox",
            options: ['For Myself', 'For Someone I Love'],
          },
          {
            text: 'How do you want to use GetCare?',
            type: "checkbox",
            options: ['Substance', 'Behavioural', 'Sexual', 'Not listed above?'],
          },
          {
            text: 'When did you start indulging?',
            type: "checkbox",
            options: ['1-12 months ago', '1-3 years ago', 'More than 10 years ago', "I can't really remember"],
          },
          {
            text: 'How often do you indulge your vice(s)?',
            options: ['Once a day', 'Multiple times a day', 'Every other day', "Once a week", "I can't keep track"],
          },
          {
            text: 'How do you engage with your vices?',
            type: "checkbox",
            options: ['Websites', 'Porn  Magazines', 'Betting Sites', 'Betting Shops', 'Substance Supplier', 'Motels', 'Not listed here?'],
          },
    ];
    const { text, type, options } = req.body;
    const isPredefined = predefinedSurveyQuestions.some((predefinedSurveyQuestion) => {
      return predefinedSurveyQuestion.text === text && JSON.stringify(predefinedSurveyQuestion.options) === JSON.stringify(options);
  });
  
  
    if (!isPredefined) {
        return res.status(400).json({
            message: 'Cannot create custom questions'
        });
    }
    const question = new Question({
        text,
        type,
        options,
    });
    try {
        const savedQuestion = await question.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
  },
};

module.exports = questionController;