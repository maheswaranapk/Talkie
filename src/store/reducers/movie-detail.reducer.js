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

const isReleaseLater = date => {
  var myDate = new Date(date);
  var today = new Date((new Date()).getTime() + 100*24*60*60*1000);
  // today.addDays(100);

  return myDate > today;


}

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
        movieVideo: action.payload[3].data.results.filter(video => {
          return video.type === "Trailer" && video.site === "YouTube";
        }),
        movieExternal: action.payload[4].data,
        isMovieDetailLoading: false
      };
    case types.MOVIE_DETAIL_REQUEST_ERROR:
      return {
        ...state,
        isMovieDetailError: true,
        isMovieDetailLoading: false
      };

    case types.PEOPLE_DETAIL_REQUEST:
      return {
        ...state,
        isPeopleDetailLoading: true,
        peopleDetail: null,
        peopleCredit: null,
        peopleExternal: null,
        isPeopleDetailError: false
      };
    case types.PEOPLE_DETAIL_REQUEST_SUCCESS:
      let data = action.payload[0].data;
      let cast = action.payload[1].data.cast;
      let crew = action.payload[1].data.crew;
      let mergedArray = undefined;

      if (crew) {
        mergedArray = crew.reduce(function(acc, obj) {
          var key = obj.department;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }

      if (mergedArray) {
        Object.keys(mergedArray).map((key, index) => {
          mergedArray[key] = mergedArray[key].sort((a, b) => {
            return getDate(b).localeCompare(getDate(a));
          });
        });
        action.payload[1].data.crew = mergedArray;
      }
      
      let knownFor = {};

      
      
      if (cast.length > 30 && data.known_for_department && data.known_for_department.toLowerCase().includes("acting")) knownFor = cast;
      else {
        if( mergedArray && mergedArray[data.known_for_department])
          knownFor = mergedArray[data.known_for_department];
          else {
            if(cast && crew) knownFor = cast.concat(crew);
            else if(cast) knownFor = cast;
            else if(crew) knownFor = crew;
          }
      }
      

      knownFor = knownFor.sort(function(a, b) {
        if(a.vote_count > 20 && b.vote_count > 20)
          return b.vote_average - a.vote_average;
        else 
        return b.vote_count - a.vote_count;
      });

      cast = cast.sort(function(a, b) {
        return getDate(b).localeCompare(getDate(a));
      });
      crew = crew.sort(function(a, b) {
        return getDate(b) - getDate(a);
      });

      // action.payload[1].data.cast = cast;

      if (knownFor) {
        knownFor = knownFor.filter(function(obj) {
          return !(
            (obj.episode_count && obj.episode_count < 5) || (!obj.character && !obj.department) ||
            (obj.department && obj.department.toLowerCase().includes("crew")) ||
            (getDate(obj) && getDate(obj).includes("0000")) ||
            (getDate(obj) && getDate(obj).length > 0 && isReleaseLater(getDate(obj))) ||
            ((obj.character && obj.character.length === 0 ) ||
            ((obj.character && obj.character.toLowerCase().includes("himself"))) ||
            (obj.character && obj.character.toLowerCase().includes("cameo")) ||
            (obj.character && obj.character.toLowerCase().includes("special appearance")) ||
            (obj.character && obj.character.toLowerCase().includes("guest appearance")) ||
            (obj.character && obj.character.toLowerCase().includes("presenter")) ||
            ((obj.character && obj.character.toLowerCase().includes("uncredited"))) ||
            ((obj.character && obj.character.toLowerCase().includes("uncredited"))))
          );
        });
      }

      // knownFor = knownFor.sort(function(a, b) {
      //   return getDate(b) - getDate(a);
      // });


      knownFor = knownFor.reduce((unique, o) => {
        if (!unique.some(obj => {return (obj.id === o.id)})) {
          unique.push(o);
        }
        return unique;
      }, []);

    
      action.payload[1].data.knownFor =
        (knownFor && knownFor.length > 20) ? knownFor.slice(0, 20) : knownFor;
      action.payload[1].data.acting = cast;
      
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
        isPeopleDetailError: true,
        isPeopleDetailLoading: false
      };
    default:
      return state;
  }
}
