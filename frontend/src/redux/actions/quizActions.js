import axios from "axios";
import { CATEGORY, DIFFICULTY, SCORE } from "./types";

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

const api = axios.create({
  baseURL: API_URL,
});

export const setCategory = (category) => ({
  type: CATEGORY,
  payload: category,
});

export const setDifficulty = (difficulty) => ({
  type: DIFFICULTY,
  payload: difficulty,
});

export const setScore = (score) => ({
  type: SCORE,
  payload: score,
});

export const saveQuizResults = (quizData) => {
  return async () => {
    try {
      await api.post("/save-quiz", quizData);
    } catch (error) {
      console.log("Error saving quiz:", error.message);
    }
  };
};
