import { CATEGORY, DIFFICULTY, SCORE } from "../actions/types";

const initialState = {
  category: "",
  difficulty: "",
  score: 0,
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY:
      return {
        ...state,
        category: action.payload,
        error: null,
      };
    case DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
        error: null,
      };
    case SCORE:
      return {
        ...state,
        score: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default quizReducer;
