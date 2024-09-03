const axios = require("axios");
const Score = require("../models/Score");

exports.categories = async (req, res) => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    res.json(response.data.trivia_categories);
  } catch (error) {
    res.status(500).send("Error fetching categories");
  }
};

exports.questions = async (req, res) => {
  const { category, difficulty } = req.body;
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: 10,
        category,
        difficulty,
        type: "multiple",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching questions");
  }
};

exports.saveQuiz = async (req, res) => {
  const { userid, category, difficulty, score } = req.body;

  try {
    const newScore = new Score({
      userid,
      category,
      difficulty,
      score,
      datetime: new Date(),
    });

    await newScore.save();
    res.status(201).json({ message: "Quiz data saved successfully" });
  } catch (error) {
    console.error("Error saving quiz data:", error);
    res.status(500).json({ message: "Failed to save quiz data" });
  }
};

exports.getQuizzes = async (req, res) => {
  const { userid } = req.params;
  try {
    const quizzes = await Score.find({ userid }).sort({ datetime: -1 });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
};
