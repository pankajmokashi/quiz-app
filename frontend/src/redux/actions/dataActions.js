import axios from "axios";
import {
  FETCH_CATEGORIES,
  FETCH_QESTIONS,
  FETCH_QUIZZES,
  SET_SELECTED_ANSWER,
} from "./types.js";

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

const api = axios.create({
  baseURL: API_URL,
});

export const getCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: categories,
});

export const getQestions = (questions) => ({
  type: FETCH_QESTIONS,
  payload: questions,
});

export const getQuizzes = (quizzes) => ({
  type: FETCH_QUIZZES,
  payload: quizzes,
});

export const setSelectedAnswer = (selectedAnswers) => ({
  type: SET_SELECTED_ANSWER,
  payload: selectedAnswers,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/categories");
      dispatch(getCategories(response.data));
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  };
};

export const fetchQestions = (parameters) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/questions", parameters);
      dispatch(getQestions(response.data.results));
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  };
};

export const fetchQuizzes = (userId) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/user-quizzes/${userId}`);
      dispatch(getQuizzes(response.data));
    } catch (error) {
      console.log("Error fetching user quizzes:", error.message);
    }
  };
};
