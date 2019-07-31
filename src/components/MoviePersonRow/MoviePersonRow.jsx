import React from "react";
import api from "../../constants/api.constant.js";
import { Link } from "react-router-dom";
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
      showRight: false
    };
  }

  listenScrollEvent = event => {
    let node = event.target;
    const scrollLeft = node.scrollLeft;

    console.log(node.scrollWidth - node.clientWidth);
    

    // if (scrollLeft === 0) {
    //   console.log("First Element Reached");
    //   this.setState({
    //     showLeft: false,
    //     showRight: true
    //   });
    // } else if (scrollLeft === node.scrollWidth - node.clientWidth) {
    //   console.log("Last Element Reached");
    //   this.setState({
    //     showLeft: true,
    //     showRight: false
    //   });
    // } else {
    //   this.setState({
    //     showLeft: true,
    //     showRight: true
    //   });
    // }
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
      showThree
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

            {(movieList || personList) && (
              <React.Fragment>
                <div className="position-relative">
                  {!row && (
                    <button
                      type="button"
                      data-role="none"
                      class={
                        (showLeft ? "d-block" : "d-none") +
                        " slick-arrow slick-prev"
                      }
                    />
                  )}
                  <div
                    className={
                      "d-flex flex-row movie-person-row " + (row ? "row" : "")
                    }
                    onScroll={this.listenScrollEvent}
                  >
                    {movieList &&
                      movieList.map(movie => (
                        <div
                          className={
                            (showThree ? "col-md-4" : "col-lg-3 col-md-4") +
                            " col-6 t-pt-4 t-pb-4"
                          }
                        >
                          <MovieTvCard movie={movie} character />
                        </div>
                      ))}

                    {personList &&
                      personList.map(person => (
                        <div className="col-6 col-md-4 col-lg-3 t-pt-4 t-pb-4">
                          <PersonCard person={person} />
                        </div>
                      ))}
                  </div>
                  {!row && (
                    <button
                      type="button"
                      data-role="none"
                      class={
                        (showRight ? "d-block" : "d-none") +
                        " slick-arrow slick-next"
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

const MovieTvCard = ({ movie, character }) => {
  return (
    <Link to={(movie.title ? "/movie-detail/" : "/tv-detail/") + movie.id}>
      <div className="movie-row-parent h-100 border-radius cursor-pointer">
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
            <div>{movie.character}</div>
          ) : (
            <React.Fragment>
              {movie.release_date && (
                <div>{movie.release_date.substring(0, 4)}</div>
              )}
              {movie.first_air_date && (
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
      <div className="person-row-parent h-100 d-flex flex-column border-radius cursor-pointer">
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
          {person.name && <h5 className="pb-1 text-center">{person.name}</h5>}
          {person.known_for_department && (
            <div className="text-center">{person.known_for_department}</div>
          )}
          {person.character && (
            <div className="text-center">{person.character}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

const CrewCard = ({ crew }) => {
  return (
    <div className="person-row-parent h-100 d-flex flex-column border-radius">
      <div className="person-row-info w-100 text-light">
        {crew.name && <h5 className="pb-1 text-center">{crew.name}</h5>}
        {crew.job && <div className="text-center job-title">{crew.job}</div>}
      </div>
    </div>
  );
};

export default MoviePersonRow;
