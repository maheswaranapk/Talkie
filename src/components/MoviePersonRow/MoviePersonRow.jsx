import React from "react";
import api from "../../constants/api.constant.js";
import { Link } from "react-router-dom";
import scrollToWithAnimation from "scrollto-with-animation";
import "./MoviePersonRow.scss";

const JOB_LIST = [
  "Director",
  "Screenplay",
  "Music",
  "Editor",
  "Director of Photography",
  "Original Music Composer",
  "Novel",
  "Creator",
  "Producer"
];

class MoviePersonRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      showRight: true
    };
  }

  listenScrollEvent = event => {
    let node = event.target;
    const scrollLeft = node.scrollLeft;

    if (scrollLeft === 0) {
      console.log("First Element Reached");
      this.setState({
        showLeft: false,
        showRight: true
      });
    } else if (scrollLeft === node.scrollWidth - node.clientWidth) {
      console.log("Last Element Reached");
      this.setState({
        showLeft: true,
        showRight: false
      });
    } else {
      this.setState({
        showLeft: true,
        showRight: true
      });
    }
  };

  scrollLeft = event => {
    let scrollContainer = document.getElementById(
      "scroll-parent" + this.props.title
    );

    scrollToWithAnimation(
      scrollContainer,
      "scrollLeft",
      scrollContainer.scrollLeft - scrollContainer.clientWidth,
      500,
      "linearTween",
      function() {
        console.log("done!");
      }
    );
  };

  scrollRight = event => {
    let scrollContainer = document.getElementById(
      "scroll-parent" + this.props.title
    );

    scrollToWithAnimation(
      scrollContainer,
      "scrollLeft",
      scrollContainer.clientWidth + scrollContainer.scrollLeft,
      500,
      "linearTween",
      function() {
        console.log("done!");
      }
    );
  };

  render() {
    let {
      title,
      movieList = [],
      personList = [],
      crewlist = [],
      videoList = [],
      row,
      character,
      showThree,
      target
    } = this.props;

    const { showLeft, showRight } = this.state;

    if (crewlist)
      crewlist = crewlist.filter(crew => {
        return JOB_LIST.indexOf(crew.job) > -1;
      });

    return (
      <React.Fragment>
        {(movieList.length > 0 ||
          personList.length > 0 ||
          videoList.length > 0 ||
          crewlist.length > 0) && (
          <div className="movie-person-row-container container t-pt-4 t-pb-4">
            {title && (
              <React.Fragment>
                <h3 className="d-none d-lg-block row pl-2 pl-md-0 pb-2 pt-2 movie-person-row-title">
                  {title}
                </h3>
                <h4 className="d-block d-lg-none row pl-2 pl-md-0 pb-1 pt-1">
                  {title}
                </h4>
              </React.Fragment>
            )}

            {videoList.length > 0 && (
              <iframe
                src={"https://www.youtube.com/embed/" + videoList[0].key}
                allowFullScreen
                title={title + " Trailer"}
              />
            )}

            {((movieList && movieList.length > 0) ||
              (personList && personList.length > 0)) && (
              <React.Fragment>
                <div className="position-relative">
                  {!row && (
                    <button
                      type="button"
                      data-role="none"
                      onClick={this.scrollLeft}
                      className={
                        (showLeft ? "d-none d-xl-block" : "d-none") +
                        " slick-arrow slick-prev "
                      }
                    />
                  )}
                  <div
                    id={"scroll-parent" + this.props.title}
                    className={
                      "d-flex flex-row movie-person-row " + (row ? "row" : "")
                    }
                    onScroll={this.listenScrollEvent}
                  >
                    {movieList &&
                      movieList.length > 0 &&
                      movieList.map(movie => (
                        <div
                          className={
                            (row
                              ? "col-6 col-lg-3 col-md-4"
                              : showThree
                              ? "col-poster-3"
                              : "col-poster") + " t-pt-4 t-pb-4"
                          }
                        >
                          <MovieTvCard
                            movie={movie}
                            character
                            target={target}
                          />
                        </div>
                      ))}

                    {personList &&
                      personList.length > 0 &&
                      personList.map(person => (
                        <div
                          className={
                            row
                              ? "col-6 col-lg-3 col-md-4 t-pt-4 t-pb-4"
                              : "col-poster t-pt-4 t-pb-4"
                          }
                        >
                          <PersonCard person={person} />
                        </div>
                      ))}
                  </div>
                  {!row && (
                    <button
                      type="button"
                      data-role="none"
                      onClick={this.scrollRight}
                      className={
                        (showRight ? "d-none d-xl-block" : "d-none") +
                        " slick-arrow slick-next "
                      }
                    />
                  )}
                </div>
              </React.Fragment>
            )}

            {crewlist && crewlist.length > 0 && (
              <React.Fragment>
                <div className="d-flex row">
                  {crewlist.map(crew => (
                    <div className="col-6 col-lg-4 t-pt-4 t-pb-4">
                      <CrewCard crew={crew} />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const MovieTvCard = ({ movie, character, target }) => {
  return (
    <Link
      to={(movie.title ? "/movie-detail/" : "/tv-detail/") + movie.id}
      target={target}
    >
      <div className="position-relative movie-row-parent border-radius cursor-pointer">
        <img
          src={"/images/default-poster.png"}
          alt={`${movie.title} poster`}
          className="movie-row-image-place w-100 cover-img border-radius"
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
        <div className="movie-row-info w-100 t-p-4 pt-4 text-light">
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
  );
};

const PersonCard = ({ person }) => {
  return (
    <Link to={"/people-detail/" + person.id}>
      <div className="position-relative person-row-parent h-100 d-flex flex-column border-radius cursor-pointer">
        <img
          src={"/images/default-profile.png"}
          alt={`${person.name} poster`}
          className="person-row-image-place w-100 cover-img border-radius"
        />
        <img
          src={
            person.profile_path
              ? api.imageUrl + person.profile_path
              : "/images/default-profile.png"
          }
          alt={`${person.name} poster`}
          className="person-row-image h-100 w-100 cover-img border-radius"
        />
        <div className="person-row-info w-100 t-p-4 pt-4 text-light">
          {person.name && (
            <h5 className="pb-1 text-center character-cast-name">
              {person.name}
            </h5>
          )}
          {person.known_for_department && (
            <div className="text-center">{person.known_for_department}</div>
          )}
          {person.character && (
            <div className="text-center character-name">{person.character}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

const CrewCard = ({ crew }) => {
  return (
    <Link to={"/people-detail/" + crew.id}>
      <div className="person-row-parent h-100 d-flex flex-column border-radius cursor-pointer">
        <div className="person-row-info w-100 text-light">
          {crew.name && <h5 className="pb-1 text-center">{crew.name}</h5>}
          {crew.job && <div className="text-center job-title">{crew.job}</div>}
        </div>
      </div>
    </Link>
  );
};

export default MoviePersonRow;
