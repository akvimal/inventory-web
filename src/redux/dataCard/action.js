import {
  FETCH_DATACARD_FAILURE,
  FETCH_DATACARD_REQUEST,
  FETCH_DEVICEDATACARD_SUCCESS,
  FETCH_COMPANYDATACARD_SUCCESS,
} from "./type";
import API from "../../config/apconfig";

const fetchDataCardRequest = () => {
  return {
    type: FETCH_DATACARD_REQUEST,
  };
};

const fetchDeviceDataCardSuccess = (data) => {
  return {
    type: FETCH_DEVICEDATACARD_SUCCESS,
    payload: data,
  };
};

const fetchCompanyDataCardSuccess = (data) => {
  return {
    type: FETCH_COMPANYDATACARD_SUCCESS,
    payload: data,
  };
};

const fetchDataCardFailure = (error) => {
  return {
    type: FETCH_DATACARD_FAILURE,
    payload: error,
  };
};

export const fetchDataCard = (path, value) => {
  return (dispatch) => {
    dispatch(fetchDataCardRequest);
    API.post(path)
      .then(({ data }) => {
        value !== "company"
          ? dispatch(fetchDeviceDataCardSuccess(data))
          : dispatch(fetchCompanyDataCardSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchDataCardFailure(err.message));
      });
  };
};
