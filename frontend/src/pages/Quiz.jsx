import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories, fetchQestions } from "../redux/actions/dataActions";
import {
  saveQuizResults,
  setCategory,
  setDifficulty,
} from "../redux/actions/quizActions";
import Categories from "../components/Categories";
import { Button, Typography } from "@material-tailwind/react";
import QuizWindow from "../components/QuizWindow";
import ScoreWindow from "../components/ScoreWindow";

function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [params, setParams] = useState({
    difficulty: "",
    category: "",
  });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [quizState, setQuizState] = useState("start");
  const { category, difficulty } = useSelector((state) => state.quiz);
  const { userId } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    dispatch(fetchCategories());
  }, [dispatch, isAuthenticated, navigate]);

  const handleChange = (id, name) => {
    setSelectedCategory(name);
    setParams({ ...params, category: id });
  };

  const handleQuizStart = () => {
    dispatch(fetchQestions(params));

    if (selectedCategory) {
      dispatch(setCategory(selectedCategory));
    } else {
      dispatch(setCategory("Random"));
    }

    if (params.difficulty) {
      dispatch(setDifficulty(params.difficulty));
    } else {
      dispatch(setDifficulty("Random"));
    }

    setQuizState("quiz");
    setParams({
      difficulty: "",
      category: "",
    });
  };

  const handleQuizEnd = (score) => {
    dispatch(
      saveQuizResults({
        userid: userId,
        category,
        difficulty,
        score,
        datetime: new Date().toISOString(),
      })
    );
    setQuizState("score");
  };

  return (
    <main className="p-4 lg:p-8">
      {quizState === "start" && (
        <div className="flex flex-col justify-center gap-8 sm:flex-row mt-10 sm:mt-20">
          <div className="w-full h-full pb-4 flex flex-col gap-4 items-center mt-10 sm:mt-0">
            <Typography className="text-center">
              For random category and difficulty click on Start Quiz button.
            </Typography>
            <select
              value={params.difficulty}
              onChange={(e) =>
                setParams({ ...params, difficulty: e.target.value })
              }
              className="max-w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <Categories value={params.category} handleChange={handleChange} />
            <Button onClick={handleQuizStart}>Start Quiz</Button>
          </div>
        </div>
      )}
      {quizState === "quiz" && (
        <QuizWindow setQuizState={setQuizState} onQuizEnd={handleQuizEnd} />
      )}
      {quizState === "score" && <ScoreWindow />}
    </main>
  );
}

export default Quiz;
