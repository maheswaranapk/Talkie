import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import listAction from "../../store/actions/list.action";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import Pagination from "react-js-pagination";

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
    this.state = {
      path: props.isMovie ? MOVIE : TV,
      selectedTag: POPULAR
    };
  }

  componentDidMount() {
    this.callApi();
  }

  handlePageChange = page => {
    this.callApi(page);
  };

  callApi = (page = 1) => {
    window.scrollTo(0, 0)
    const { path, selectedTag } = this.state;
    this.props.actions.getList(path + selectedTag + "page=" + page + "&");
  };

  ChangeFilter = tag => {
    this.setState(
      {
        selectedTag: tag
      },
      () => {
        this.callApi();
      }
    );
  };

  render() {
    const { selectedTag, path } = this.state;
    const { list, isListLoading } = this.props;

    return (
      <div className="container-fluid">
      {isListLoading && <Loader />}
        {list && list.results && (
          <div className="container">
            <div className="movies-filter d-flex justify-content-center justify-content-lg-end t-pt-4 t-mr-4">
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
)(ListPage);
