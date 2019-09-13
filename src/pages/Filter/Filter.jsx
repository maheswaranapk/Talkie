import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import listAction from "../../store/actions/list.action";
import Select from "react-select";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import AsyncSelect from "react-select/async";
import queryString from "query-string";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";

import axiosInstance from "../../services/axios";
import debounce from "es6-promise-debounce";
import { Footer } from "../../components/Footer/Footer";
import Pagination from "react-js-pagination";
import Loader from "../../components/Loader/Loader";
import ErrorView from "../../components/ErrorView/ErrorView";
import api from "../../constants/api.constant.js";
import {
  SORT_ORDER,
  GENRE_TYPE_MOVIE,
  GENRE_TYPE_TV,
  MOVIE,
  MOVIE_TV_FILTER
} from "../../constants/filter.constants";

import "./Filter.scss";

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
          <div className="d-flex flex-row">

            <div
            style={{backgroundImage: "url(" + (cast.profile_path
            ? api.imageUrl + cast.profile_path
            : "/images/default-profile.png") + ")"}}
              
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

    this.basePath = "discover";
    var parsedParams = queryString.parse(this.props.location.search);
    if (parsedParams.sortBy) console.log(JSON.parse(parsedParams.sortBy));

    this.state = {
      sortBy: parsedParams.sortBy
        ? JSON.parse(parsedParams.sortBy)
        : SORT_ORDER[0],
      selectedTag: parsedParams.type ? parsedParams.type : MOVIE,
      genre: parsedParams.genre ? JSON.parse(parsedParams.genre) : null,
      cast: parsedParams.cast ? JSON.parse(parsedParams.cast) : [],
      crew: parsedParams.crew ? JSON.parse(parsedParams.crew) : [],
      page: parsedParams.page ? parsedParams.page : 1
    };
    
    this.props.history.push({
      search: "" 
    });
  }

  componentDidMount() {
    this.callApi();
  }

  setQuery = () => {
    const { sortBy, genre, cast, crew, selectedTag, page } = this.state;
    const query = { type: selectedTag };

    if (genre) query.genre = JSON.stringify(genre);
    if (sortBy) query.sortBy = JSON.stringify(sortBy);
    if (cast) query.cast = JSON.stringify(cast);
    if (cast) query.crew = JSON.stringify(crew);
    query.page = page;

    console.log(cast);
    console.log(query.cast);

    this.props.history.push({
      search: "?" + queryString.stringify(query)
    });
  };

  handlePageChange = page => {
    this.setState({ page }, () => {
      this.callApi();
    });
  };

  ChangeFilter = tag => {
    this.setState(
      {
        selectedTag: tag,
        genre: this.getGenreList(tag)[0],
        page: 1
      },
      () => {
        this.callApi();
      }
    );
  };

  callApi = () => {
    const { sortBy, genre, cast, crew, selectedTag, page } = this.state;
    window.scrollTo(0, 0);
    console.log(this.basePath);
    
    // this.setQuery();
    let apiPath =
      this.basePath +
      selectedTag +
      "?sort_by=" +
      sortBy.value +
      "&page=" +
      page;
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
      // primary25: "#c62828",
      primary: "#c62828"
    }
  });

  handleGenreChange = value => {
    this.setState({ genre: value, page: 1 }, this.callApi);
  };

  handleSortByChange = value => {
    this.setState({ sortBy: value, page: 1 }, this.callApi);
  };

  handleCastChange = value => {
    this.setState({ cast: value, page: 1 }, this.callApi);
  };

  handleCrewChange = value => {
    this.setState({ crew: value, page: 1 }, this.callApi);
  };

  getGenreList = selectedTag =>
    selectedTag === MOVIE ? GENRE_TYPE_MOVIE : GENRE_TYPE_TV;

  render() {
    const { discoverList, isDiscoverListLoading, isDiscoverListError } = this.props;
    const { genre, selectedTag, sortBy, cast, crew } = this.state;

    return (
      <div className="container-fluid">
        <DefaultHelmet />
        <div className="container filter-container">
          <div className="container t-mt-4">
            <div className="movies-filter d-flex justify-content-center justify-content-lg-end t-pb-4">
              <ul>
                {MOVIE_TV_FILTER.map(item => (
                  <li
                    key={item.slug}
                    className={item.tag === selectedTag ? "active" : ""}
                    onClick={() => this.ChangeFilter(item.tag)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="row">
              {selectedTag === MOVIE && (
                <React.Fragment>
                  <AsyncSelect
                    className="col-12 col-md-6 cast-select multi-select"
                    isMulti
                    defaultOptions
                    placeholder="Select Cast.."
                    onChange={this.handleCastChange}
                    loadOptions={debounce(promiseOptions, 750)}
                    theme={this.getTheme}
                    defaultOptions={cast ? true : false}
                    value={cast}
                  />
                  <AsyncSelect
                    className="col-12 col-md-6 crew-select multi-select"
                    isMulti
                    placeholder="Select Crew.."
                    onChange={this.handleCrewChange}
                    loadOptions={debounce(promiseOptions, 750)}
                    theme={this.getTheme}
                    defaultOptions={crew ? true : false}
                  />
                </React.Fragment>
              )}
              <Select
                options={SORT_ORDER}
                className="col-6 sort-select"
                onChange={this.handleSortByChange}
                defaultValue={SORT_ORDER[0]}
                theme={this.getTheme}
                isSearchable={false}
                value={sortBy}
              />
              <Select
                options={this.getGenreList(selectedTag)}
                className="col-6 tag-select"
                onChange={this.handleGenreChange}
                value={genre ? genre : this.getGenreList(selectedTag)[0]}
                theme={this.getTheme}
                isSearchable={false}
              />
            </div>
            {isDiscoverListError && <ErrorView onClick={this.callApi} />} 
            {isDiscoverListLoading && <Loader />}
            {discoverList && discoverList.results && (
              <React.Fragment>
                <MoviePersonRow row target="_blank" movieList={discoverList.results} />
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
)(withRouter(Filter));
