import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import api from "../../constants/api.constant.js";
import movieDetailActions from "../../store/actions/movie-detail.action";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import ExternalID from "../../components/ExternaIId/ExternalId";
import { Footer } from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import "./DetailPage.scss";

const TV = "/tv";
const MOVIE = "/movie";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    if (!(props.match && props.match.params && props.match.params.id)) {
      this.props.history.push("/");
    }
    this.isCreatorAdded = false;
    this.state = {
      path: props.isMovie ? MOVIE : TV,
      id: props.match.params.id
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { path, id } = this.state;
    this.props.actions.getMovieDetail(path + "/" + id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.state;
    if (id !== this.props.match.params.id) {
      window.scrollTo(0, 0);
      this.setState(
        {
          id: this.props.match.params.id
        },
        () => {
          const { path, id } = this.state;
          this.props.actions.getMovieDetail(path+ "/" + id);
        }
      );
    }
  }

  render() {
    const {
      movieDetail,
      movieCredit,
      movieSimilar,
      movieVideo,
      movieExternal,
      isMovieDetailLoading
    } = this.props;

    const {path} = this.state;

    if (!movieDetail && this.isCreatorAdded) this.isCreatorAdded = false;

    if (
      !this.isCreatorAdded &&
      movieCredit &&
      movieCredit.crew &&
      movieDetail &&
      movieDetail.created_by &&
      movieDetail.created_by.length > 0
    ) {
      for (let creator of movieDetail.created_by) {
        creator.job = "Creator";
        movieCredit.crew.unshift(creator);
      }
      this.isCreatorAdded = true;
    }

    return (
      <React.Fragment>
        {isMovieDetailLoading && <Loader />}
        {movieDetail && (
          <div
            className="position-relative  d-flex justify-content-center movie-detail-container"
            style={{
              backgroundImage:
                "url(" + api.imagePosterUrl + movieDetail.backdrop_path + ")"
            }}
          >
            <div className="movie-detail container d-flex  flex-column">
              <div className="d-flex  flex-column flex-lg-row  w-100 min-height">
                <div className="col-12 col-lg-4 movie-detail-poster-container t-pt-4 d-flex flex-column align-items-center">
                  <img
                    src={
                      movieDetail.poster_path
                        ? api.imageUrl + movieDetail.poster_path
                        : "/images/default-poster.png"
                    }
                    alt={`${movieDetail.title} poster`}
                    className="movie-poster-image border-radius t-mb-4"
                  />
                  <div className="w-100 t-mb-4 d-none d-lg-block">
                    {movieDetail.genres.map(genre => {
                      return (
                        <Link to={"/filter?genre="+ JSON.stringify({value: genre.id, label: genre.name})+"&type="+path}>
                        <div className="tag col cursor-pointer">
                          {genre.name}
                        </div>
                        </Link>
                      );
                    })}
                  </div>
                  {movieExternal && <ExternalID external={movieExternal} />}
                </div>
                <div className="col-12 col-lg-8 text-light t-pt-4 pb-5">
                  <div>
                    {movieDetail.title && (
                      <h1 className="t-pb-4 ">{movieDetail.title}</h1>
                    )}
                    {movieDetail.name && (
                      <h1 className="t-pt-4  t-pb-4 ">{movieDetail.name}</h1>
                    )}
                    <div className="d-flex flex-row t-pt-2 t-pb-2">
                      {movieDetail.release_date && (
                        <h6 className=" text-justify movie-info">
                          {(movieDetail.release_date
                            ? movieDetail.release_date
                            : "") +
                            (movieDetail.runtime
                              ? " (" + movieDetail.status + ")  "
                              : "") +
                            (movieDetail.runtime
                              ? " - " + movieDetail.runtime + "mins"
                              : "")}
                        </h6>
                      )}
                      {movieDetail.number_of_seasons && (
                        <h6 className=" text-justify movie-info">
                          {movieDetail.number_of_seasons +
                            " Seasons - " +
                            movieDetail.number_of_episodes +
                            " Episodes     " +
                            "(" +
                            movieDetail.status +
                            ") " +
                            (movieDetail.episode_run_time
                              ? " - " + movieDetail.episode_run_time + "mins"
                              : "")}
                        </h6>
                      )}
                    </div>
                    <div className="t-pt-2 text-justify movie-overview t-pb-4">
                      {movieDetail.overview}
                    </div>
                  </div>

                  <MoviePersonRow title="Cast" personList={movieCredit.cast} />
                  <div className="d-none d-md-block">
                    <MoviePersonRow title="Crew" crewlist={movieCredit.crew} />
                  </div>
                  <MoviePersonRow title="Trailer" videoList={movieVideo} />

                  <MoviePersonRow
                    title="Smilar Movies"
                    movieList={movieSimilar}
                    showThree
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isMovieDetailLoading: state.movieDetailReducer.isMovieDetailLoading,
  movieDetail: state.movieDetailReducer.movieDetail,
  movieCredit: state.movieDetailReducer.movieCredit,
  movieSimilar: state.movieDetailReducer.movieSimilar,
  movieVideo: state.movieDetailReducer.movieVideo,
  movieExternal: state.movieDetailReducer.movieExternal,
  isMovieDetailError: state.movieDetailReducer.isMovieDetailError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getMovieDetail: movieDetailActions.getMovieDetail
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailPage));