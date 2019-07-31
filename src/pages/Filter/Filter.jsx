import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import listAction from "../../store/actions/list.action";
import Select from "react-select";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../services/axios";
import debounce from "es6-promise-debounce";
import { Footer } from "../../components/Footer/Footer";
import Pagination from "react-js-pagination";
import Loader from "../../components/Loader/Loader";
import api from "../../constants/api.constant.js";

import "./Filter.scss";

const SORT_ORDER = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" }
];

const GENRE_TYPE = [
  { value: null, label: "All Genres" },
  { value: 28, label: "Action" },
  { value: 12, label: "Adventure" },
  { value: 16, label: "Animation" },
  { value: 35, label: "Comedy" },
  { value: 80, label: "Crime" },
  { value: 99, label: "Documentary" },
  { value: 18, label: "Drama" },
  { value: 10751, label: "Family" },
  { value: 14, label: "Fantasy" },
  { value: 36, label: "History" },
  { value: 27, label: "Horror" },
  { value: 10402, label: "Music" },
  { value: 9648, label: "Mystery" },
  { value: 10749, label: "Romance" },
  { value: 878, label: "Science Fiction" },
  { value: 10770, label: "TV Movie" },
  { value: 53, label: "Thriller" },
  { value: 10752, label: "War" },
  { value: 37, label: "Western" }
];

const promiseOptions = inputValue => {
  return axiosInstance
    .get(
      "search/person?query=" +
        inputValue +
        "&" +
        process.env.REACT_APP_TMDB_APIKEY
    )
    .then(function(response) {
      let options = response.data.results.map(cast => ({
        value: "" + cast.id,
        label: (
          <div>
            <img
              src={
                cast.profile_path
                  ? api.imageUrl + cast.profile_path
                  : "/images/default-profile.png"
              }
              className="t-pr-2 auto-complete-image"
              alt={cast.name}
            />
            {cast.name}
          </div>
        )
      }));
      return options;
    })
    .catch(function(error) {
      console.log(error);
    });
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.basePath = "discover/movie";
    this.state = {
      sortBy: SORT_ORDER[0],
      genre: null,
      cast: []
    };
  }

  componentDidMount() {
    this.callApi();
  }

  handlePageChange = page => {
    this.callApi(page);
  };

  callApi = (page = 1) => {
    const { sortBy, genre, cast, crew } = this.state;
    let apiPath = this.basePath + "?sort_by=" + sortBy.value + "&page=" + page;
    if (genre && genre.value) apiPath = apiPath + "&with_genres=" + genre.value;
    if (cast && cast.length > 0) {
      apiPath =
        apiPath +
        "&with_cast=" +
        cast.map(item => {
          return item["value"];
        });
    }
    if (crew && crew.length > 0) {
      apiPath =
        apiPath +
        "&with_crew=" +
        crew.map(item => {
          return item["value"];
        });
    }
    this.props.actions.getDiscoverList(apiPath + "&");
  };

  getTheme = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#c62828",
      primary: "#c62828"
    }
  });

  handleGenreChange = value => {
    this.setState({ genre: value }, this.callApi);
  };

  handleSortByChange = value => {
    this.setState({ sortBy: value }, this.callApi);
  };

  handleCastChange = value => {
    this.setState({ cast: value }, this.callApi);
  };

  handleCrewChange = value => {
    this.setState({ crew: value }, this.callApi);
  };

  render() {
    const { discoverList, isDiscoverListLoading } = this.props;
    return (
      <div className="container filter-container">
        <div className="container t-mt-4">
          <div className="row">
            <AsyncSelect
              className="col-6 p-0 t-mb-4 t-pr-2 multi-select"
              isMulti
              defaultOptions
              placeholder="Select Cast.."
              onChange={this.handleCastChange}
              loadOptions={debounce(promiseOptions, 750)}
              theme={this.getTheme}
            />
            <AsyncSelect
              className="col-6 p-0 t-mb-4 t-pl-2 multi-select"
              isMulti
              placeholder="Select Crew.."
              onChange={this.handleCrewChange}
              loadOptions={debounce(promiseOptions, 750)}
              theme={this.getTheme}
            />
            <Select
              options={SORT_ORDER}
              className="col-6 p-0 t-pr-2"
              onChange={this.handleSortByChange}
              defaultValue={SORT_ORDER[0]}
              theme={this.getTheme}
            />
            <Select
              options={GENRE_TYPE}
              className="col-6 p-0 t-pl-2"
              onChange={this.handleGenreChange}
              defaultValue={GENRE_TYPE[0]}
              theme={this.getTheme}
            />
          </div>

          {isDiscoverListLoading && <Loader />}
          {discoverList && discoverList.results && (
            <React.Fragment>
              <MoviePersonRow row movieList={discoverList.results} />
              <div className="pagination-container">
                <Pagination
                  activePage={discoverList.page}
                  itemsCountPerPage={20}
                  totalItemsCount={discoverList.total_results}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  prevPageText={``}
                  nextPageText={``}
                  firstPageText={``}
                  lastPageText={``}
                />
              </div>
            </React.Fragment>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isDiscoverListLoading: state.listReducer.isDiscoverListLoading,
  discoverList: state.listReducer.discoverList,
  isDiscoverListError: state.listReducer.isDiscoverListError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getDiscoverList: listAction.getDiscoverList
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
