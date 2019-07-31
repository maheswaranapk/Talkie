import * as types from "../../constants/action-types.constant";

const initialState = {
  isMovieDetailLoading: false,
  movieDetail: null,
  movieCredit: null,
  movieSimilar: null,
  movieVideo: null,
  movieExternal: null,
  isMovieDetailError: false,
  isPeopleDetailLoading: false,
  peopleDetail: null,
  peopleCredit: null,
  peopleExternal: null,
  isPeopleDetailError: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MOVIE_DETAIL_REQUEST:
      return {
        ...state,
        isMovieDetailLoading: true,
        movieDetail: null,
        movieCredit: null,
        movieSimilar: null,
        movieVideo: null,
        movieExternal: null,
        isMovieDetailError: null
      };
    case types.MOVIE_DETAIL_REQUEST_SUCCESS:
      return {
        ...state,
        movieDetail: action.payload[0].data,
        movieCredit: action.payload[1].data,
        movieSimilar: action.payload[2].data.results,
        movieVideo: action.payload[3].data.results.filter((video) => {
          return video.type === "Trailer" && video.site === "YouTube";
        }),
        movieExternal: action.payload[4].data,
        isMovieDetailLoading: false
      };
    case types.MOVIE_DETAIL_REQUEST_ERROR:
      return {
        ...state,
        isMovieDetailError: action.error.data,
        isMovieDetailLoading: false
      };

      case types.PEOPLE_DETAIL_REQUEST:
      return {
        ...state,
        isPeopleDetailLoading: false,
        peopleDetail: null,
        peopleCredit: null,
        peopleExternal: null,
        isPeopleDetailError: false
      };
    case types.PEOPLE_DETAIL_REQUEST_SUCCESS:
      return {
        ...state,
        peopleDetail: action.payload[0].data,
        peopleCredit: action.payload[1].data,
        peopleExternal: action.payload[2].data,
        isPeopleDetailLoading: false
      };
    case types.PEOPLE_DETAIL_REQUEST_ERROR:
      return {
        ...state,
        isPeopleDetailError: action.error.data,
        isPeopleDetailLoading: false
      };
    default:
      return state;
  }
}