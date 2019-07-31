import React from "react";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";

import "./CoverImage.scss";
import api from "../../constants/api.constant.js";

export default class CoverImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colors: ["#000000"] };
  }

  render() {
    const { movie } = this.props;
    return (
      <Link to={"/movie-detail/" + movie.id}>
        <div className="container t-pl-2 t-pr-2 cursor-pointer">
          <div className="cover-slide-parent bg-light border-radius">
            <ColorExtractor
              src={api.imageUrl + movie.backdrop_path}
              getColors={colors => {
                this.setState({ colors: colors });
              }}
            />
            <img
              src={api.imagePosterUrl + movie.backdrop_path}
              alt={`${movie.title} `}
              className="cover-slide-image w-100"
            />
            <div
              className="d-flex d-md-none flex-column justify-content-end pb-3 movie-title cover-text-parent t-pl-4"
              style={{
                background:
                  "linear-gradient(to right, " +
                  this.state.colors[0] +
                  ", rgba(0,0,0,0))"
              }}
            >
              <MovieDetail movie={movie} />
            </div>
            <div
              className="d-none d-md-flex flex-column justify-content-center movie-title cover-text-parent t-pl-4"
              style={{
                background:
                  "linear-gradient(to right, " +
                  this.state.colors[0] +
                  ", " +
                  this.state.colors[0] +
                  ", rgba(0,0,0,0))"
              }}
            >
              <MovieDetail movie={movie} />
            </div>
            <div
              className="d-none d-lg-flex flex-column justify-content-center movie-title cover-text-parent pl-5"
              style={{
                background:
                  "linear-gradient(to right, " +
                  this.state.colors[0] +
                  ", " +
                  this.state.colors[0] +
                  ", " +
                  this.state.colors[0] +
                  ", rgba(0,0,0,0))"
              }}
            >
              <MovieDetail movie={movie} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

const MovieDetail = ({ movie }) => {
  return (
    <React.Fragment>
      <h4 className="d-block d-lg-none movie-title pb-3">{movie.title}</h4>
      <h3 className="d-none d-lg-block movie-title">{movie.title}</h3>
      <div className="d-none d-lg-block">
        <div className="movie-overview">{movie.overview}</div>
      </div>
    </React.Fragment>
  );
};
