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

const getDate = detail => {
  if(detail.release_date) return detail.release_date; 
  if(detail.first_air_date) return detail.first_air_date;
  return "0000";
};

export default function(state = initialState, action) {
  console.log(action);
  
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
        movieVideo: action.payload[3].data.results.filter(video => {
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
        console.log("PEOPLE_DETAIL_REQUEST");
      return {
        ...state,
        isPeopleDetailLoading: true,
        peopleDetail: null,
        peopleCredit: null,
        peopleExternal: null,
        isPeopleDetailError: false
      };
    case types.PEOPLE_DETAIL_REQUEST_SUCCESS:
        console.log("PEOPLE_DETAIL_REQUEST_SUCCESS");
      let cast = action.payload[1].data.cast;
      let crew = action.payload[1].data.crew;
      
      let knownFor = {};

      if (cast > 30) knownFor = cast;
      else {
        knownFor = cast.concat(crew);
      }
      

      knownFor = knownFor.sort(function(a, b) {
        return b.vote_count - a.vote_count;
      });

      console.log(knownFor);
      


      cast = cast.sort(function(a, b) {
        return getDate(b).localeCompare(getDate(a));
      });
      crew = crew.sort(function(a, b) {
        return getDate(b) - getDate(a);
      });

      // action.payload[1].data.cast = cast;

      if (knownFor && knownFor.length > 20) {
        knownFor = knownFor.filter(function(obj) {
          return !(
            (obj.episode_count && obj.episode_count < 5) || (!obj.character && !obj.department) ||
            (!obj.department && (obj.character && obj.character.length === 0 ))
          );
        });
      }
      console.log(knownFor);

      // knownFor = knownFor.sort(function(a, b) {
      //   return getDate(b) - getDate(a);
      // });


      knownFor = knownFor.reduce((unique, o) => {
        if (!unique.some(obj => {return (obj.id === o.id)})) {
          unique.push(o);
        }
        return unique;
      }, []);

      const mergedArray = crew.reduce(function (acc, obj) {
        var key = obj.department;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    
      Object.keys(mergedArray).map(function(key, index) {
        mergedArray[key] = mergedArray[key].sort((a, b) => {
          return getDate(b).localeCompare(getDate(a));
        });        
      });
    
      action.payload[1].data.knownFor =
        (knownFor && knownFor.length > 20) ? knownFor.slice(0, 20) : knownFor;
      action.payload[1].data.acting = cast;
      action.payload[1].data.crew = mergedArray;

      console.log(knownFor);
      

      return {
        ...state,
        peopleDetail: action.payload[0].data,
        peopleCredit: action.payload[1].data,
        peopleExternal: action.payload[2].data,
        isPeopleDetailLoading: false
      };
    case types.PEOPLE_DETAIL_REQUEST_ERROR:
      console.log(action);
      
      return {
        ...state,
        isPeopleDetailError: true,
        isPeopleDetailLoading: false
      };
    default:
      return state;
  }
}
