import { combineReducers } from "redux";
import homeReducer from "./reducers/home.reducer";
import movieDetailReducer from "./reducers/movie-detail.reducer"
import listReducer from "./reducers/list.reducer"

const appReducer = combineReducers({
  homeReducer,
  movieDetailReducer,
  listReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
