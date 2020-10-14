import { SET_LOADER } from "./actions/ui";
import { API_SUCCESS, API_ERROR } from "./actions/api";
import { LOGOUT } from "./actions/auth";
// import { GET_CLIENTS, CLIENTS_ERROR } from "./middlewares/api"
import { GET_CLIENTS, CLIENTS_ERROR } from './actions/ui';


export default (
  state = {
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLoading: false,
    error: null,
    clients: [],
  },
  action
) => {
  console.log('Data: ', action);
  switch (action.type) {
    case API_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isAuthUser: true, user: action.payload };
    case API_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: {} };
    case GET_CLIENTS:
      return { ...state, clients: action.payload };
    case CLIENTS_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

