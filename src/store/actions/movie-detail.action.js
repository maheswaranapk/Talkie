import * as actionTypes from "../../constants/action-types.constant";

const getMovieDetail = data => ({
  type: actionTypes.MOVIE_DETAIL_REQUEST,
  payload: data
});

const getPeopleDetail = data => ({
  type: actionTypes.PEOPLE_DETAIL_REQUEST,
  payload: data
});

const movieDetailActions = {
  getMovieDetail,
  getPeopleDetail
};

export default movieDetailActions;
