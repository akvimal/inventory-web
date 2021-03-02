import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000" || process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
  },
});
