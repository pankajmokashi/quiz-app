const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userController = require("./controllers/userController");
const quizController = require("./controllers/quizController");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/register", userController.register);
app.post("/login", userController.login);

app.get("/categories", quizController.categories);
app.post("/questions", quizController.questions);
app.post("/save-quiz", quizController.saveQuiz);
app.get("/user-quizzes/:userid", quizController.getQuizzes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
