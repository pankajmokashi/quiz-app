import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  token: "",
  userId: localStorage.getItem("userId") || "",
  isAuthenticated: !!localStorage.getItem("userId"),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: "",
        userid: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
