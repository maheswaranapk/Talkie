import { takeLatest } from "redux-saga/effects";
import * as types from "../../constants/action-types.constant";
import { fetchTrending } from "./home.sagas";
import { getMovieDetail, getPeopleDetail } from "./movie-detail.sagas";
import { getList, getDiscoverList, getSearchList } from "./list.sagas";

export default function* watchRegisterRequest() {
  yield takeLatest(types.TRENDING_REQUEST, fetchTrending);
  yield takeLatest(types.MOVIE_DETAIL_REQUEST, getMovieDetail);
  yield takeLatest(types.PEOPLE_DETAIL_REQUEST, getPeopleDetail);
  yield takeLatest(types.LIST_REQUEST, getList);
  yield takeLatest(types.SEARCH_REQUEST, getSearchList);
  yield takeLatest(types.DISCOVER_REQUEST, getDiscoverList);
}
