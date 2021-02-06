import {
  FETCH_TABLE_FAILURE,
  FETCH_TABLE_REQUEST,
  FETCH_TABLE_SUCCESS,
  FETCH_INNERTABLE_SUCCESS,
} from "./type";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {
    isLoading: false,
    error: null,
    data: [],
    data2: [],
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
    case FETCH_INNERTABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data2: action.payload,
        error: null,
      };
    default:
      return state;
  }
};
