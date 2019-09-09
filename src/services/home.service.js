import axiosInstance from "./axios";
import api from "../constants/api.constant.js";

const trendingMovie = () => {
  return axiosInstance
    .get(api.trendingMovie)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const trendingTv = () => {
  return axiosInstance
    .get(api.trendingTV)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const trendingPerson = () => {
  return axiosInstance
    .get(api.trendingPerson)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const nowPlaying = () => {
  return axiosInstance
    .get(api.nowPlaying)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const multiSearch = (inputValue) => {
  return axiosInstance
    .get(api.multiSearch + "&query="+inputValue)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const movieService = {
  trendingMovie,
  trendingTv,
  trendingPerson,
  nowPlaying,
  multiSearch,
};

export default movieService;
