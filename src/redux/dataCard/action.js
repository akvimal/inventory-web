import {
  FETCH_DATACARD_FAILURE,
  FETCH_DATACARD_REQUEST,
  FETCH_DATACARD_SUCCESS,
} from "./type";
import API from "../../config/apconfig";

const fetchDataCardRequest = () => {
  return {
    type: FETCH_DATACARD_REQUEST,
  };
};

const fetchDataCardSuccess = (data) => {
  return {
    type: FETCH_DATACARD_SUCCESS,
    payload: data,
  };
};

const fetchDataCardFailure = (error) => {
  return {
    type: FETCH_DATACARD_FAILURE,
    payload: error,
  };
};

export const fetchDataCard = (path) => {
  return (dispatch) => {
    dispatch(fetchDataCardRequest);
    API.post(path)
      .then(({ data })  => {
        dispatch(fetchDataCardSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchDataCardFailure(err.message));
      });
  };
};
