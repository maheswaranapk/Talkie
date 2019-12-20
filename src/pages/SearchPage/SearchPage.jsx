import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
import queryString from "query-string";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";

import Tag from "../../constants/tag.constants";
import listAction from "../../store/actions/list.action";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import ErrorView from "../../components/ErrorView/ErrorView";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import "./SearchPage.scss";

const FILTER = [
  {
    title: "MOVIE",
    tag: Tag.MOVIE
  },
  {
    title: "TV",
    tag: Tag.TV
  },
  {
    title: "PEOPLE",
    tag: Tag.PEOPLE
  }
];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    if (!(props.match && props.match.params && props.match.params.id)) {
      this.props.history.push("/");
    }

    const parsedParams = queryString.parse(this.props.location.search);
    this.state = {
      inputValue: props.match.params.id,
      selectedTag: parsedParams.type ? parsedParams.type : Tag.MOVIE,
      page: parsedParams.page ? parsedParams.page : 1
    };
  }

  componentDidMount() {
    this.callApi();
  }

  componentDidUpdate(prevProps) {

    const { inputValue } = this.state;
    if (inputValue !== this.props.match.params.id) {
      window.scrollTo(0, 0);
      const parsedParams = queryString.parse(this.props.location.search);
      this.setState(
        {
          inputValue: this.props.match.params.id,
          selectedTag: parsedParams.type ? parsedParams.type : Tag.MOVIE,
          page: parsedParams.page ? parsedParams.page : 1
        },
        () => {
          this.callApi();
          this.updateResult();
        }
      );
    } else if (this.props.location.search !== prevProps.location.search) {
      this.updateResult();
    }
  }

  updateResult = () => {
    const { inputValue } = this.state;
    
    window.scrollTo(0, 0);
    const { selectedTag, page } = this.state;

    this.props.actions.getSearchList(
      selectedTag + "query=" + inputValue + "&page=" + page + "&"
    );
  };

  // componentDidUpdate(prevProps) {
  //   const locationChanged =
  //     this.props.location.search !== prevProps.location.search;
  //   console.log(this.props.location);

  //   if (locationChanged) {
  //     console.log(this.props.location);
  //     window.scrollTo(0, 0);
  //     const { path, selectedTag, page } = this.state;

  //     this.props.actions.getSearchList(
  //       selectedTag + "query=" + inputValue + "&page=" + page + "&"
  //     );
  //   }
  // }

  handlePageChange = page => {
    this.setState(
      {
        page
      },
      () => {
        this.callApi();
      }
    );
  };

  callApi = () => {
    window.scrollTo(0, 0);
    const { inputValue, selectedTag, page } = this.state;

    if (
      this.props.location.search !==
      "?type=" + selectedTag + "&page=" + page
    ) {
      this.props.history.replace({
        pathname: "/search/" + inputValue,
        search: "?type=" + selectedTag + "&page=" + page
      });
    } else {
      this.updateResult();
    }
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
    const { selectedTag, inputValue } = this.state;
    const { list, isListLoading, isListError } = this.props;

    return (
      <div className="container-fluid">
        <DefaultHelmet />
        {isListError && <ErrorView onClick={this.callApi} />}
        {isListLoading && <Loader />}
        {list && list.results && (
          <div className="container">
            <div className="movies-filter d-flex align-items-center justify-content-center justify-content-md-between pt-3">
              <h5 className="d-none d-md-block text-primary pl-2">{"Search Results for \"" + inputValue + "\""}</h5>
              <ul>
                {FILTER.map(item => (
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
              <h5 className="d-block d-md-none text-primary pl-2 pt-3">{"Search Results for \"" + inputValue + "\""}</h5>
            <MoviePersonRow
              row
              movieList={selectedTag !== Tag.PEOPLE ? list.results : undefined}
              personList={selectedTag === Tag.PEOPLE ? list.results : undefined}
            />
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
      getSearchList: listAction.getSearchList
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchPage));
