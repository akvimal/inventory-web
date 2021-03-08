import API from "../config/apconfig";

export const fetchDataCardService = async (path) => {
  return await API.post(path)
    .then(({ data }) => data)
    .catch((err) => err.message);
};

export const fetchTableService = async (path, value) => {
  return await API.post(path, value)
    .then(({ data }) => data)
    .catch((err) => err.message);
};
