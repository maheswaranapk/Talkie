import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import listAction from "../../store/actions/list.action";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import ErrorView from "../../components/ErrorView/ErrorView";
import Pagination from "react-js-pagination";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";

import "./ListPage.scss";

const POPULAR = "popular?";
const TOP_RATED = "top_rated?";
const TV_NOW_PLAYING = "on_the_air?";
const MOVIE_NOW_PLAYING = "now_playing?";

const TV = "/tv/";
const MOVIE = "/movie/";

const TV_FILTER = [
  {
    title: "Popular",
    tag: POPULAR
  },
  {
    title: "Top rated",
    tag: TOP_RATED
  },
  {
    title: "Now Playing",
    tag: TV_NOW_PLAYING
  }
];

const MOVIE_FILTER = [
  {
    title: "Popular",
    tag: POPULAR
  },
  {
    title: "Top rated",
    tag: TOP_RATED
  },
  {
    title: "Now Playing",
    tag: MOVIE_NOW_PLAYING
  }
];

class ListPage extends React.Component {
  constructor(props) {
    super(props);

    let parsedParams = queryString.parse(this.props.location.search);
    this.state = {
      path: props.isMovie ? MOVIE : TV,
      selectedTag: parsedParams.selectedTag
        ? parsedParams.selectedTag
        : POPULAR,
      page: parsedParams.page ? parsedParams.page : 1
    };
  }

  componentDidMount() {
    this.callApi();
  }

  componentDidUpdate(prevProps) {
    const locationChanged =
      this.props.location.search !== prevProps.location.search;
    console.log(this.props.location);

    if (locationChanged) {
      this.updateResult();
    }
  }

  updateResult = () => {
    window.scrollTo(0, 0);
    const { path, selectedTag, page } = this.state;
    this.props.actions.getList(path + selectedTag + "page=" + page + "&");
  };

  handlePageChange = page => {
    this.setState({ page }, () => {
      this.callApi(page);
    });
  };

  callApi = () => {
    const { path, selectedTag, page } = this.state;

    if (
      this.props.location.search !==
      "?selectedTag=" + selectedTag + "&page=" + page
    ) {
      this.props.history.replace({
        search: "?selectedTag=" + selectedTag + "&page=" + page
      });
    } else {
      this.updateResult();
    }

    // this.props.actions.getList(path + selectedTag + "page=" + page + "&");
  };

  ChangeFilter = tag => {
    this.setState(
      {
        selectedTag: tag,
        page: 1
      },
      () => {
        this.callApi();
      }
    );
  };

  render() {
    const { selectedTag, path } = this.state;
    const { list, isListLoading, isListError } = this.props;

    return (
      <div className="container-fluid">
        <DefaultHelmet />
        {isListError && <ErrorView onClick={this.callApi} />}
        {isListLoading && <Loader />}
        {list && list.results && (
          <React.Fragment>
          <div className="container">
            <div className="movies-filter d-flex justify-content-center justify-content-lg-end t-pt-4">
              <ul>
                {(path === MOVIE ? MOVIE_FILTER : TV_FILTER).map(item => (
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
            <MoviePersonRow row movieList={list.results} />
            <div className="pagination-container">
              <Pagination
                activePage={list.page}
                itemsCountPerPage={20}
                totalItemsCount={list.total_results}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                prevPageText={``}
                nextPageText={``}
                firstPageText={``}
                lastPageText={``}
              />
            </div>
          </div>
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isListLoading: state.listReducer.isListLoading,
  list: state.listReducer.list,
  isListError: state.listReducer.isListError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getList: listAction.getList
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListPage));
