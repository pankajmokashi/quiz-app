const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userController = require("./controllers/userController");
const quizController = require("./controllers/quizController");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET, POST",
  })
);

app.post("/register", userController.register);
app.post("/login", userController.login);

app.get("/categories", quizController.categories);
app.post("/questions", quizController.questions);
app.post("/save-quiz", quizController.saveQuiz);
app.get("/user-quizzes/:userid", quizController.getQuizzes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT} PORT`)
);