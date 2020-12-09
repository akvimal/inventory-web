export const SET_LOADER = 'SET_LOADER';
export const GET_CLIENTS = 'GET_CLIENTS';
export const CLIENTS_ERROR = 'CLIENTS_ERROR';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export const setLoader = flag => {
    return {
      type: SET_LOADER,
      payload: flag
    };
};

export const get_clients= (data)=> {
  return {
    type: GET_CLIENTS,
    payload: data
  };
};

export const clients_error = (error) => {
  return {
    type: CLIENTS_ERROR,
    payload: error
  };
};

export const get_products= (data)=> {
  return {
    type: GET_PRODUCTS,
    payload: data
  };
};
