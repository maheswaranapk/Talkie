import axiosInstance from "./axios";

const movieDetail = data => {
  return axiosInstance
    .get(data + "?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const movieCredit = data => {
  return axiosInstance
  .get(data + "/credits?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const movieSimilar = data => {
  return axiosInstance
  .get(data + "/similar?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const movieVideo = data => {
  return axiosInstance
  .get(data + "/videos?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

const movieExternal = data => {
  return axiosInstance
  .get(data + "/external_ids?" + process.env.REACT_APP_TMDB_APIKEY)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

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

const movieService = {
  movieDetail,
  movieCredit,
  movieSimilar,
  movieVideo,
  movieExternal,
  peopleDetail,
  peopleCredit,
  peopleExternal
};

export default movieService;
