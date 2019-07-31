import axiosInstance from "./axios";
import api from "../constants/api.constant.js";

const peopleDetail = data => {
  return axiosInstance
    .get(data + "?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const peopleCredit = data => {
  return axiosInstance
  .get(data + "/combined_credits?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const peopleExternal = data => {
  return axiosInstance
  .get(data + "/external_ids?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const peopleService = {
  peopleDetail,
  peopleCredit,
  peopleSimilar,
  peopleVideo,
  peopleExternal
};

export default peopleService;
