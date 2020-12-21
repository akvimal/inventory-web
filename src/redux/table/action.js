import {
    FETCH_TABLE_FAILURE,
    FETCH_TABLE_REQUEST,
    FETCH_TABLE_SUCCESS,
  } from "./type";
  import API from "../../config/apconfig";
  
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
  
  const fetchTableFailure = (error) => {
    return {
      type: FETCH_TABLE_FAILURE,
      payload: error,
    };
  };
  
  export const fetchTable = (path,value) => {

    console.log(path,value);

    return (dispatch) => {
      dispatch(fetchTableRequest);
      API.post(path,value)
        .then(({ data }) => {
          dispatch(fetchTableSuccess(data))
        })
        .catch((err) => {
          dispatch(fetchTableFailure(err.message));
        });
    };
  };
  