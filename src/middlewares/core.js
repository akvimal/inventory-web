import axios from "axios";
import { API_REQUEST, apiError, apiSuccess } from "../actions/api";
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
          console.log('DData: ',user);
          dispatch(apiSuccess({ user }))})
      .catch(error => {
        console.log(error);
        dispatch(apiError({ error: error.response.data }));
      });
  }
};

const dummyLogin = (data) => {
    return new Promise((resolve,reject)=>{
        console.log('>>> ',data)
        return resolve({email:data.email})
    });
}