import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";
import homeActions from "../../store/actions/home.action";
import CoverImage from "../../components/CoverImage/CoverImage";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import Loader from "../../components/Loader/Loader";
import { Footer } from "../../components/Footer/Footer";
import ErrorView from "../../components/ErrorView/ErrorView";
import "./Home.scss";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MAX_CONTAINER_WIDTH1 = 1140;
const MAX_CONTAINER_WIDTH2 = 960;
const MAX_CONTAINER_WIDTH3 = 720;
const MAX_CONTAINER_WIDTH4 = 540;

const SLICK_SETTING = {
  autoplay: true,
  autoplaySpeed: 5000,
  className: "slides",
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "20px",
  swipeToSlide: true,
  adaptiveHeight: true
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenWidth: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    const { isTrendingLoadingDone } = this.props;
    if (!isTrendingLoadingDone) this.props.actions.getTrendingTvMovie({});
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  callApi = () => {
    this.props.actions.getTrendingTvMovie({});
  }

  calculatecenterpadding = () => {
    const { screenWidth } = this.state;
    let centerPadding = "50px";

    if (screenWidth > MAX_CONTAINER_WIDTH1) {
      centerPadding = (screenWidth - MAX_CONTAINER_WIDTH1) / 2 + "px";
    } else if (screenWidth > MAX_CONTAINER_WIDTH2) {
      centerPadding = (screenWidth - MAX_CONTAINER_WIDTH2) / 2 + "px";
    } else if (screenWidth > MAX_CONTAINER_WIDTH3) {
      centerPadding = (screenWidth - MAX_CONTAINER_WIDTH3) / 2 + "px";
    } else if (screenWidth > MAX_CONTAINER_WIDTH4) {
      centerPadding = (screenWidth - MAX_CONTAINER_WIDTH4) / 2 + "px";
    }

    return centerPadding;
  };

  render() {
    const {
      isTrendingLoading,
      trendingMovies,
      nowPlayingList,
      trendingTvShows,
      trendingPerson,
      isTrendingError
    } = this.props;

    SLICK_SETTING.centerPadding = this.calculatecenterpadding();

    return (
      <div className="container-fluid d-flex flex-column  bg-light">
        <img src={"/images/default-poster.png"} className="d-none" alt="" 
              width="100%"
              height="100%"/>
        <img src={"/images/default-profile.png"} className="d-none" alt=""
              width="100%"
              height="100%"/>
        <DefaultHelmet />
        {isTrendingError && <ErrorView onClick={this.callApi} />}
        {isTrendingLoading && <Loader />}
        {trendingMovies && (
          <Slider {...SLICK_SETTING}>
            {nowPlayingList.map((movie,index) => (
              <CoverImage movie={movie} key={"Cover Image " + index}/>
            ))}
          </Slider>
        )}
        <div className="container mb-lg-5">
          {trendingMovies && (
            <MoviePersonRow
              title="Trending Movies"
              movieList={trendingMovies}
            />
          )}
          {trendingMovies && (
            <MoviePersonRow
              title="Trending TV Shows"
              movieList={trendingTvShows}
            />
          )}
          {trendingPerson && (
            <MoviePersonRow
              title="Trending People"
              personList={trendingPerson}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTrendingLoading: state.homeReducer.isTrendingLoading,
  nowPlayingList: state.homeReducer.nowPlayingList,
  trendingMovies: state.homeReducer.trendingMovies,
  trendingTvShows: state.homeReducer.trendingTvShows,
  trendingPerson: state.homeReducer.trendingPerson,
  isTrendingError: state.homeReducer.isTrendingError,
  isTrendingLoadingDone: state.homeReducer.isTrendingLoadingDone
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getTrendingTvMovie: homeActions.getTrendingTvMovie
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
