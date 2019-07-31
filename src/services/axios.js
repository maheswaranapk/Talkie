import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_APIURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" }
});

export const axiosService = (data) => {
  return axiosInstance
    .get(data + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export default axiosInstance;
