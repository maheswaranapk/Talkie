import React from "react";
import scrollToWithAnimation from "scrollto-with-animation";

import MovieTvCard from "./MovieTvCard/MovieTvCard";
import PersonCard from "./PersonCard/PersonCard";
import CrewCard from "./CrewCard/CrewCard";
import VideoCard from "./VideoCard/VideoCard";

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
      this.setState({
        showLeft: false,
        showRight: true
      });
    } else if (scrollLeft === node.scrollWidth - node.clientWidth) {
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
      function() {}
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
      function() {}
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
      showThree,
      target
    } = this.props;

    const { showLeft, showRight } = this.state;

    if(personList && personList.length > 0 &&  personList.length < 5 && (showLeft || showRight)) {
      this.setState({
        showLeft: false,
        showRight: false
      })
    } 

    if(movieList && movieList.length > 0 &&  movieList.length < 5 && (showLeft || showRight)) {
      this.setState({
        showLeft: false,
        showRight: false
      })
    } 

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
          <div className="movie-person-row-container">
            {title && (
              <React.Fragment>
                <h3 className="d-none d-lg-block row pl-2 pl-md-0 pb-2 pt-3 movie-person-row-title">
                  {title}
                </h3>
                <h4 className="d-block d-lg-none row pl-2 pl-md-0 pb-1 pt-2">
                  {title}
                </h4>
              </React.Fragment>
            )}

            {videoList && videoList.length > 0 && (
              <VideoCard trailerId={videoList[0].key} title={title} />
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
                      movieList.map((movie, index) => (
                        <MovieTvCard
                          key={"movie-" + index}
                          movie={movie}
                          character
                          target={target}
                          row={row}
                          showThree={showThree}
                        />
                      ))}

                    {personList &&
                      personList.length > 0 &&
                      personList.map((person, index) => (
                        <PersonCard person={person} row={row} key={"movie-" + index} />
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
                  {crewlist.map((crew, index) => (
                      <CrewCard crew={crew} key={"movie-" + index} />
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

export default MoviePersonRow;
