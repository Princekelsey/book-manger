import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Resgister User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("./login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save data to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set the current user
export const setCurrentUser = decoded => {
  return { type: SET_CURRENT_USER, payload: decoded };
};

// log out user
export const logoutUser = () => dispatch => {
  // remove token from localstorage
  localStorage.removeItem("jwtToken");
  // remove auth token header
  setAuthToken(false);
  //set current user to empty
  dispatch(setCurrentUser({}));
};
