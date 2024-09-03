import {
  FETCH_CATEGORIES,
  FETCH_QESTIONS,
  FETCH_QUIZZES,
  SET_SELECTED_ANSWER,
} from "../actions/types";

const initialState = {
  categories: [],
  questions: {},
  selectedAnswers: {},
  quizzes: [],
  error: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case FETCH_QESTIONS:
      return {
        ...state,
        questions: action.payload,
        error: null,
      };
    case FETCH_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
        error: null,
      };
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswers: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default dataReducer;
