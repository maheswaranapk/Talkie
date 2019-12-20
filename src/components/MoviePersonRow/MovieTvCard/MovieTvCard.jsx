import React from "react";
import api from "../../../constants/api.constant.js";
import { Link } from "react-router-dom";

import "./MovieTvCard.scss";

const MovieTvCard = ({ movie, character, target, row, showThree }) => {
  return (
    <div
      className={
        (row
          ? "col-6 col-lg-3 col-md-4"
          : showThree
          ? "col-poster-3"
          : "col-poster") + " my-3"
      }
    >
      <Link
        to={(movie.title ? "/movie-detail/" : "/tv-detail/") + movie.id}
        target={target}
      >
        <div className="position-relative movie-row-parent border-radius cursor-pointer">
          <img
            src={"/images/default-poster.png"}
            alt={`${movie.title} poster`}
            className="movie-row-image-place h-100 w-100 cover-img border-radius"
          />
          <img
            src={
              movie.poster_path
                ? api.imageUrl + movie.poster_path
                : "/images/default-poster.png"
            }
            alt={`${movie.title} poster`}
            className="movie-row-image h-100 w-100 cover-img border-radius"
          />
          <div className="movie-row-info w-100 p-3 p-3 text-light">
            {movie.title && <h5 className="pb-1">{movie.title}</h5>}
            {movie.name && <h5 className="pb-1">{movie.name}</h5>}
            {character && movie.character ? (
              <div className="character-name">{movie.character}</div>
            ) : (
              <React.Fragment>
                {movie.department && <div className="">{movie.department}</div>}
                {movie.release_date && !movie.department && (
                  <div>{movie.release_date.substring(0, 4)}</div>
                )}
                {movie.first_air_date && !movie.department && (
                  <div>{movie.first_air_date.substring(0, 4)}</div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieTvCard;
