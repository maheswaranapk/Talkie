import * as actionTypes from "../../constants/action-types.constant";

const getList = data => ({
  type: actionTypes.LIST_REQUEST,
  payload: data
});

const getDiscoverList = data => ({
  type: actionTypes.DISCOVER_REQUEST,
  payload: data
});

const movieDetailActions = {
  getList,
  getDiscoverList
};

export default movieDetailActions;
