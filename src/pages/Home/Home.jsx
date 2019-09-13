import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";
import homeActions from "../../store/actions/home.action";
import CoverImage from "../../components/CoverImage/CoverImage";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import Loader from "../../components/Loader/Loader";
import { Footer } from "../../components/Footer/Footer";
import "./Home.scss";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MAX_CONTAINER_WIDTH1 = 1140;
const MAX_CONTAINER_WIDTH2 = 960;
const MAX_CONTAINER_WIDTH3 = 720;
const MAX_CONTAINER_WIDTH4 = 540;

const SLICK_SETTING = {
  autoplay: false,
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
    const {isTrendingLoadingDone} = this.props;
    if(!isTrendingLoadingDone) this.props.actions.getTrendingTvMovie({});
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

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
      trendingPerson
    } = this.props;

    SLICK_SETTING.centerPadding = this.calculatecenterpadding();

    return (
      <div className="container-fluid bg-light">
        <DefaultHelmet />
        {isTrendingLoading && <Loader />}
        {trendingMovies && (
          <Slider {...SLICK_SETTING}>
            {nowPlayingList.map(movie => (
              <CoverImage movie={movie} />
            ))}
          </Slider>
        )}
        {trendingMovies && (
          <MoviePersonRow title="Trending Movies" movieList={trendingMovies} />
        )}
        {trendingMovies && (
          <MoviePersonRow
            title="Trending TV Shows"
            movieList={trendingTvShows}
          />
        )}
        {trendingPerson && (
          <MoviePersonRow title="Trending People" personList={trendingPerson} />
        )}

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
  isTrendingLoadingDone: state.homeReducer.isTrendingLoadingDone,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getTrendingTvMovie: homeActions.getTrendingTvMovie
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
