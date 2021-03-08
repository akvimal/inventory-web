import {
  FETCH_DATACARD_FAILURE,
  FETCH_DATACARD_REQUEST,
  FETCH_DEVICEDATACARD_SUCCESS,
  FETCH_COMPANYDATACARD_SUCCESS,
} from "./type";
import { fetchDataCardService } from "../../services/services";

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

    fetchDataCardService(path)
      .then((e) => {
        value !== "company"
          ? dispatch(fetchDeviceDataCardSuccess(e))
          : dispatch(fetchCompanyDataCardSuccess(e));
      })
      .catch((e) => dispatch(fetchDataCardFailure(e)));
  };
};
