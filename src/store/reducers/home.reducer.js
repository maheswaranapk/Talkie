import * as types from "../../constants/action-types.constant";

const initialState = {
  isTrendingLoading: false,
  nowPlayingList: null,
  trendingMovies: null,
  trendingTvShows: null,
  trendingPerson: null,
  isTrendingError: false,
  isTrendingLoadingDone: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.TRENDING_REQUEST:
      return {
        ...state,
        isTrendingLoading: true,
        nowPlayingList: null,
        trendingMovies: null,
        trendingTvShows: null,
        trendingPerson: null,
        isTrendingError: null
      };
    case types.TRENDING_REQUEST_SUCCESS:
      return {
        ...state,
        nowPlayingList: action.payload[0].data.results,
        trendingMovies: action.payload[1].data.results,
        trendingTvShows: action.payload[2].data.results,
        trendingPerson: action.payload[3].data.results,
        isTrendingLoading: false,
        isTrendingLoadingDone: true,
      };
    case types.TRENDING_REQUEST_ERROR:
      return {
        ...state,
        isTrendingError: true,
        isTrendingLoading: false
      };
    default:
      return state;
  }
}
