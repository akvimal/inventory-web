import {
  FETCH_AUTHLOGIN_REQUEST,
  FETCH_AUTHLOGIN_SUCCESS,
  FETCH_AUTHLOGIN_FAILURE,
  LOGOUT,
} from "./authType";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {
    isLoading: false,
    error: null,
    isAuth: localStorage.getItem("token") !== null ? true : false,
    auth: "",
    user: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_AUTHLOGIN_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_AUTHLOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: action.payload.isLogged,
        user: action.payload.data,
      };
    case FETCH_AUTHLOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        auth: "",
        error: null,
      };
    default:
      return state;
  }
};
