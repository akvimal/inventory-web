import {
  FETCH_DATACARD_FAILURE,
  FETCH_DATACARD_REQUEST,
  FETCH_DATACARD_SUCCESS,
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
    case FETCH_DATACARD_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DATACARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
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
