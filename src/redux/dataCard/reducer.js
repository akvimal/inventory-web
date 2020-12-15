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
        // isLoading: false,
        // error: action.payload,
        data: [
          {
            name: "BaconBit",
            status: [
              { name: "Installed", count: 10 },
              { name: "Available", count: 15 },
              { name: "BioClean", count: 25 },
              { name: "repair", count: 40 },
              { name: "Disconnected", count: 41 },
            ],
          },
          {
            name: "RasperryPig",
            status: [
              { name: "Installed", count: 10 },
              { name: "Available", count: 15 },
              { name: "BioClean", count: 25 },
              { name: "repair", count: 40 },
              { name: "Disconnected", count: 41 },
            ],
          },
          {
            name: "Category1",
            status: [
              { name: "Installed", count: 10 },
              { name: "Available", count: 15 },
              { name: "BioClean", count: 25 },
              { name: "repair", count: 40 },
              { name: "Disconnected", count: 41 },
            ],
          },
          {
            name: "Device",
            status: [
              { name: "Installed", count: 10 },
              { name: "Available", count: 15 },
              { name: "BioClean", count: 25 },
              { name: "repair", count: 40 },
              { name: "Disconnected", count: 41 },
            ],
          },
        ],
      };
    default:
      return state;
  }
};
