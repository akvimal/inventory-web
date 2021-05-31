import {
  FETCH_TABLE_FAILURE,
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_INNERTABLE_SUCCESS,
} from "./type";
import API from "../../config/apconfig";
const getTokenFromStorage = () => localStorage.getItem("token");
const fetchTableRequest = () => {
  return {
    type: FETCH_TABLE_REQUEST,
  };
};

const fetchTableSuccess = (data) => {
  return {
    type: FETCH_TABLE_SUCCESS,
    payload: data,
  };
};

const fetchInnerTableSuccess = (data) => {
  return {
    type: FETCH_INNERTABLE_SUCCESS,
    payload: data,
  };
};

const fetchTableFailure = (error) => {
  return {
    type: FETCH_TABLE_FAILURE,
    payload: error,
  };
};

export const fetchTable = (path, value) => {
  // console.log(path, value);
  return (dispatch) => {
    dispatch(fetchTableRequest);
    API.post(path, value, {headers: {
      Accept: "application/json",
      "auth-token": getTokenFromStorage(),
    }})
      .then(({ data }) => {
        path !== "dashboard/device/history"
          ? dispatch(fetchTableSuccess(data))
          : dispatch(fetchInnerTableSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchTableFailure(err.message));
      });
  };
};
