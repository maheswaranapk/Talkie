import * as actionTypes from "../../constants/action-types.constant";

const getTrendingTvMovie = data => ({
  type: actionTypes.TRENDING_REQUEST,
  payload: data
});

const homeActions = {
  getTrendingTvMovie
};

export default homeActions;
