import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./src/redux/reducers/authReducer";
import dataReducer from "./src/redux/reducers/dataReducer";
import quizReducer from "./src/redux/reducers/quizReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  quiz: quizReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
