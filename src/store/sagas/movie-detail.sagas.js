import { put, all, retry } from "redux-saga/effects";
import * as actionTypes from "../../constants/action-types.constant";
import movieService from "../../services/movie.service";
import appSettings from "../../constants/app-settings.constant";

export function* getMovieDetail(action) {
  try {
    let data = yield all([
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.movieDetail,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.movieCredit,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.movieSimilar,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.movieVideo,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.movieExternal,
        action.payload
      ),
    ]);
    yield put({
      type: actionTypes.MOVIE_DETAIL_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({ type: actionTypes.MOVIE_DETAIL_REQUEST_ERROR, error });
  }
}

export function* getPeopleDetail(action) {
  try {
    let data = yield all([
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.peopleDetail,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.peopleCredit,
        action.payload
      ),
      retry(
        appSettings.apiMaxRetry,
        appSettings.apiRetryDelay,
        movieService.peopleExternal,
        action.payload
      ),
    ]);
    yield put({
      type: actionTypes.PEOPLE_DETAIL_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({ type: actionTypes.PEOPLE_DETAIL_REQUEST_ERROR, error });
  }
}
