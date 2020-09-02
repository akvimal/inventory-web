export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR'
export const API_REQUEST = 'API_REQUEST'

export const apiSuccess = user => {
    console.log('APISuccess',user);
    return {
      type: API_SUCCESS,
      payload: user
    };
};
export const apiError = error => {
    return {
      type: API_ERROR,
      payload: error
    };
};
export const apiRequest = data => {
    return {
      type: API_REQUEST,
      meta: data
    };
};