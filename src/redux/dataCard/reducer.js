import {
  FETCH_DATACARD_FAILURE,
  FETCH_DATACARD_REQUEST,
  FETCH_DEVICEDATACARD_SUCCESS,
  FETCH_COMPANYDATACARD_SUCCESS,
} from "./type";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {
    isLoading: false,
    error: null,
    device: [],
    company: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_DATACARD_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DEVICEDATACARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        device: action.payload,
        error: null,
      };
    case FETCH_COMPANYDATACARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company: action.payload,
        error: null,
      };
    case FETCH_DATACARD_FAILURE:
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
