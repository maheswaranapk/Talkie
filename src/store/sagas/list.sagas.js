import { put, retry } from "redux-saga/effects";
import * as actionTypes from "../../constants/action-types.constant";
import { axiosService } from "../../services/axios";
import appSettings from "../../constants/app-settings.constant";

export function* getList(action) {
  try {
    let data = yield retry(
      appSettings.apiMaxRetry,
      appSettings.apiRetryDelay,
      axiosService,
      action.payload
    );
    yield put({
      type: actionTypes.LIST_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({ type: actionTypes.LIST_REQUEST_ERROR, error });
  }
}

export function* getSearchList(action) {
  
  try {
    let data = yield retry(
      appSettings.apiMaxRetry,
      appSettings.apiRetryDelay,
      axiosService,
      action.payload
    );
    yield put({
      type: actionTypes.LIST_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({ type: actionTypes.LIST_REQUEST_ERROR, error });
  }
}

export function* getDiscoverList(action) {
  try {
    let data = yield retry(
      appSettings.apiMaxRetry,
      appSettings.apiRetryDelay,
      axiosService,
      action.payload
    );
    yield put({
      type: actionTypes.DISCOVER_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({ type: actionTypes.DISCOVER_REQUEST_ERROR, error });
  }
}
