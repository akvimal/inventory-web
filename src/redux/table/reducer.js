import {
    FETCH_TABLE_FAILURE,
    FETCH_TABLE_REQUEST,
    FETCH_TABLE_SUCCESS,
  } from "./type";
  
  export default (
    state = {
      isLoading: false,
      error: null,
      data: [],
    },
    action
  ) => {
    switch (action.type) {
      case FETCH_TABLE_REQUEST:
        return { ...state, isLoading: true };
      case FETCH_TABLE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          error: null,
        };
      case FETCH_TABLE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          data: [],
        };
      default:
        return state;
    }
  };
  