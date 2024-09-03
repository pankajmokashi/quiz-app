import PropTypes from "prop-types";

function Question({
  questions,
  currentQuestionIndex,
  selected,
  handleAnswerSelect,
}) {
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className=" w-full mt-8 px-4 sm:mt-16 sm:px-8 text-sm sm:text-base xl:w-3/4 class">
      <div className="border flex">
        <div className="p-2 border-r">Q{currentQuestionIndex + 1}</div>
        <div className="p-2">
          {decodeHtml(questions[currentQuestionIndex].question)}
        </div>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {[
          questions[currentQuestionIndex].correct_answer,
          ...questions[currentQuestionIndex].incorrect_answers,
        ]
          .sort()
          .map((answer, index) => (
            <div
              key={index}
              className={`p-1 border-2 rounded ${
                selected[currentQuestionIndex] == answer
                  ? " border-green-400"
                  : " border-white"
              }`}
            >
              <div
                onClick={() => handleAnswerSelect(answer)}
                className="border border-blue-gray-300 flex cursor-pointer rounded"
              >
                <div className="flex items-center justify-center  px-2 py-1 sm:px-4 sm:py-2 border-r border-blue-gray-300">
                  {index + 1}
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
  );
}

Question.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  selected: PropTypes.object.isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
};

export default Question;
