import { put, all, retry } from "redux-saga/effects";
import * as actionTypes from "../../constants/action-types.constant";
import homeService from "../../services/home.service";
import appSettings from "../../constants/app-settings.constant";

export function* fetchTrending(action) {
  try {
    const data = yield all([
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        homeService.nowPlaying,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        homeService.trendingMovie,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        homeService.trendingTv,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        homeService.trendingPerson,
        action.payload
      )
    ]);
    yield put({ type: actionTypes.TRENDING_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionTypes.TRENDING_REQUEST_ERROR, error });
  }
}
