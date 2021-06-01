// import { AuthLoginService } from "../../Services/Services";
import {
  FETCH_AUTHLOGIN_REQUEST,
  FETCH_AUTHLOGIN_SUCCESS,
  FETCH_AUTHLOGIN_FAILURE,
  LOGOUT,
} from "./authType";
import API from "../../config/apconfig";

const fetchAuthLoginRequest = () => {
  return {
    type: FETCH_AUTHLOGIN_REQUEST,
  };
};

const fetchAuthLoginSuccess = (data) => {
  return {
    type: FETCH_AUTHLOGIN_SUCCESS,
    payload: data,
  };
};

const fetchAuthLoginFailure = (error) => {
  return {
    type: FETCH_AUTHLOGIN_FAILURE,
    payload: error,
  };
};

const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT,
  };
};

export const fetchAuthLogin = (user) => {
  return (dispatch) => {
    dispatch(fetchAuthLoginRequest());
    API.post(`/auth/login`, user)
      .then((response) => {
        if (
          (response.data.token === null,
          response.data.isLogged === false,
          response.data.error === "Only Admin")
        ) {
          return alert("Only Admin can login");
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch(fetchAuthLoginSuccess(response.data));
        }
      })
      .catch((e) => dispatch(fetchAuthLoginFailure(e)));
  };
};

export const fetchLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};