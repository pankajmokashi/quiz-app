import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ScoreWindow() {
  const { questions, selectedAnswers } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const { score } = useSelector((state) => state.quiz);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="w-full h-full">
      <div className="max-h-10 w-full flex items-center justify-between">
        <div className="text-xl font-bold flex items-center">
          Score: {score} / {questions.length}
        </div>
        <div className="">
          <Button color="blue" onClick={() => navigate("/profile")}>
            Close
          </Button>
        </div>
      </div>

      <div className="w-full text-left mt-4 h-[calc(100vh-12.5rem)] overflow-auto text-xs sm:text-sm">
        {questions.map((question, index) => (
          <div key={index} className="border p-4 mb-4 xl:w-3/4">
            <div className="font-bold mb-2">
              {index + 1}. {decodeHtml(question.question)}
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {[question.correct_answer, ...question.incorrect_answers]
                .sort()
                .map((answer, ind) => (
                  <div
                    key={ind}
                    className={`p-1 border-2 rounded ${
                      answer == question.correct_answer
                        ? "border-green-400"
                        : answer == selectedAnswers[index]
                        ? "border-red-400"
                        : selectedAnswers[index] == undefined
                        ? "border-red-400"
                        : "border-white"
                    }`}
                  >
                    <div className="border border-blue-gray-300 flex cursor-pointer rounded">
                      <div className="flex items-center justify-center  px-2 py-1 sm:px-4 sm:py-2 border-r border-blue-gray-300">
                        {ind + 1}
                      </div>
                      <div
                        className={`flex items-center justify-center w-full px-2 py-1 sm:p-2 text-xs sm:text-sm `}
                      >
                        {decodeHtml(answer)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreWindow;
