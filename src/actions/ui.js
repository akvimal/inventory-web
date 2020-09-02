export const SET_LOADER = 'SET_LOADER';

export const setLoader = flag => {
    return {
      type: SET_LOADER,
      payload: flag
    };
};