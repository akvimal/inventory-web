import axios from 'axios';

 const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   access_token: localStorage.getItem('access_token')
  //     ? localStorage.getItem('access_token')
  //     : '',
  //   authorizedtoken: localStorage.getItem('authorizedtoken')
  //     ? localStorage.getItem('authorizedtoken')
  //     : '',
  // },
});

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.resolve({ error });
//   }
// );

export default http;
