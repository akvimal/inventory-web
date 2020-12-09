import axios from "axios";
import http from '../config/axios_config';
import { GET_CLIENTS, CLIENTS_ERROR, get_clients, clients_error,get_products } from "../actions/ui";
import { API_REQUEST, apiError, apiSuccess, API_SUCCESS } from "../actions/api";
import { setLoader } from "../actions/ui";

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === API_REQUEST) {
    dispatch(setLoader(true));
    const { url, method, data } = action.meta;
    // axios({
    //   method,
    //   url,
    //   data
    // })
    dummyLogin(data)
      .then(user => {
        console.log('DData: ', user);
        dispatch(apiSuccess({ user }))
      })
      .catch(error => {
        console.log(error);
        dispatch(apiError({ error: error.response.data }));
      });
  }
};

const dummyLogin = (data) => {
  return new Promise((resolve, reject) => {
    console.log('>>> ', data)
    return resolve({ email: data.email })
  });
}

export const getClients = () => {
  return async (dispatch) => {
    dispatch(get_clients())
    await http.get('/clients')
      .then(response => {
        const data = response.data
        dispatch(get_clients(data))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(clients_error(error))
      })
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(get_products())
    await http.get('/clients')
      .then(response => {
        const data = response.data
        dispatch(get_clients(data))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(clients_error(error))
      })
  }
}