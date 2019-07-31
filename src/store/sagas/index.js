import { fork, all } from "redux-saga/effects";
import watchRegisterRequest from "./watchers";

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* rootSaga() {
  yield all([fork(watchRegisterRequest)]);
}
