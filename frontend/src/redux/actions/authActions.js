import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "./types.js";

export const loginSuccess = (token, userId) => ({
  type: LOGIN_SUCCESS,
  payload: { token, userId },
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const logoutSuccess = () => ({
  type: LOGOUT,
});

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
  };
};

// selectors.js
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
