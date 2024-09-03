import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { setSelectedAnswer } from "../redux/actions/dataActions";
import { setScore } from "../redux/actions/quizActions";
import Question from "./Question";

function QuizWindow({ setQuizState, onQuizEnd }) {
  const [selected, setSelected] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { questions } = useSelector((state) => state.data);
  const [timer, setTimer] = useState(30);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }
  }, [timer]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Clear timer on unmount or when moving to the next question
    return () => clearInterval(countdown);
  }, [currentQuestionIndex]);

  // const handleNext = () => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  // };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset the timer for the next question
    } else {
      handleSubmit(); // Submit when the last question is reached
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelected({
      ...selected,
      [currentQuestionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    dispatch(setSelectedAnswer(selected));
    const score = questions.reduce((acc, question, index) => {
      if (selected[index] === question.correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    dispatch(setScore(score));
    onQuizEnd(score);
  };

  if (!questions[currentQuestionIndex]) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>Remaining Time: {timer}</div>
        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded">
          <XMarkIcon
            className="w-6 h-6"
            onClick={() => setQuizState("start")}
          />
        </div>
      </div>

      <Question
        quiz="running"
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selected={selected}
        handleAnswerSelect={handleAnswerSelect}
      />

      <div className="max-w-full w-full mt-8 px-8 flex justify-end xl:w-3/4 pb-4">
        {currentQuestionIndex < questions.length - 1 ? (
          <Button color="blue" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button color="green" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

QuizWindow.propTypes = {
  setQuizState: PropTypes.func.isRequired,
  onQuizEnd: PropTypes.func.isRequired,
};

export default QuizWindow;
