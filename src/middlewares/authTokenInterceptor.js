import axios from 'axios';


export function authTokenInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const getauthToken =  localStorage.getItem("token");
        const apiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

        if (getauthToken && apiUrl) {
            request.headers.common.Authorization = `auth-token ${getauthToken}`;
        }

        return request;
    });
}