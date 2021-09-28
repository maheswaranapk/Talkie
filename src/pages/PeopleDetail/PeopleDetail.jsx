import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import DefaultHelmet from "../../components/DefaultHelmet/DefaultHelmet";
import movieDetailActions from "../../store/actions/movie-detail.action";
import api from "../../constants/api.constant.js";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import ExternalID from "../../components/ExternaIId/ExternalId";
import Loader from "../../components/Loader/Loader";
import { Footer } from "../../components/Footer/Footer";
import ErrorView from "../../components/ErrorView/ErrorView";
import ShowMoreText from "react-show-more-text";

import "./PeopleDetail.scss";
import MetaHelmet from "../../components/MetaHelmet/MetaHelmet";

class PeopleDetail extends React.Component {
  constructor(props) {
    super(props);
    if (!(props.match && props.match.params && props.match.params.id)) {
      this.props.history.push("/");
    }
    this.isCreatorAdded = false;
    this.state = {
      path: "/person/",
      peopleId: props.match.params.id
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { peopleId } = this.state;
    if (peopleId !== this.props.match.params.id) {
      window.scrollTo(0, 0);
      this.setState(
        {
          peopleId: this.props.match.params.id
        },
        () => {
          this.fetchData();
        }
      );
    }
  }

  fetchData = () => {
    const { path, peopleId } = this.state;
    this.props.actions.getPeopleDetail(path + peopleId);
  };

  getYear = detail => {
    if (detail.release_date) return detail.release_date.slice(0, 4);
    if (detail.first_air_date) return detail.first_air_date.slice(0, 4);
    return "";
  };

  getRow = (movie, previousItem) => {
    return (
      <React.Fragment>
        {previousItem &&
        this.getYear(previousItem).localeCompare(this.getYear(movie)) ? (
          <hr />
        ) : (
          ""
        )}
        <div className="d-flex flex-row" >
          <div className="year">
            {!previousItem ||
            (previousItem &&
              this.getYear(previousItem).localeCompare(this.getYear(movie)) !==
                0) ||
            this.getYear(movie).length === 0 ? (
              <div className="year-padding">{this.getYear(movie)}</div>
            ) : (
              <div className="here" />
            )}
          </div>

          <div className="seperator"> - </div>
          <div className="movie-title cursor-pointer" onClick={() => {
          if (movie.media_type === "movie") this.props.history.push("/movie/"+movie.id);
          else  this.props.history.push("/tv/"+movie.id);
        }}>
            {movie.title} {movie.name}
          </div>
          {movie.character && (
            <div className="movie-character">
              {"as "}
              <span>{movie.character}</span>
            </div>
          )}
          {movie.job && (
            <div className="movie-character">
              {"... "}
              <span>{movie.job}</span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      peopleDetail,
      peopleCredit,
      peopleExternal,
      isPeopleDetailLoading,
      isPeopleDetailError
    } = this.props;

    return (
      <React.Fragment>
        <DefaultHelmet />
        {isPeopleDetailError && <div className="d-flex flex-column"><ErrorView onClick={this.fetchData} />
              <Footer /></div>}
        {isPeopleDetailLoading && <Loader />}
        {peopleDetail && peopleCredit && (
          <div
            className="position-relative  d-flex justify-content-center people-detail-container"
            style={
              peopleCredit.knownFor && peopleCredit.knownFor.length > 0
                ? {
                    backgroundImage:
                      "url(" +
                      api.imagePosterUrl +
                      peopleCredit.knownFor[0].backdrop_path +
                      ")"
                  }
                : {}
            }
          >
            <div className="container row people-detail-container people-detail">
              <div className="col-12 col-xl-4 people-detail-poster-container pt-3 d-flex flex-column">
                <img
                  src={
                    peopleDetail.profile_path
                      ? api.imageUrl + peopleDetail.profile_path
                      : "/images/default-profile.png"
                  }
                  alt={`${peopleDetail.name} poster`}
                  className="people-profile-image border-radius mb-3 h-auto"
                  width="100%"
                  height="100%"
                />
                <MetaHelmet 
                  title={(peopleDetail.name ? peopleDetail.name : "") }
                  description={peopleDetail.biography ? peopleDetail.biography : ""} 
                  image={api.imageUrl + peopleDetail.profile_path} />

                <div className="d-none d-xl-block">
                  <PersonalInfo peopleDetail={peopleDetail} />
                </div>

                {peopleExternal && <ExternalID external={peopleExternal} />}
              </div>
              <div className="col-12 col-xl-8 text-light pt-3 pb-5">
                {peopleDetail.name && (
                  <h1 className="py-3">{peopleDetail.name}</h1>
                )}
                {peopleDetail.biography && (
                  <ShowMoreText
                    className="pt-2 text-justify people-overview pb-3"
                    lines={5}
                    more="Show more"
                    less="Show less"
                    expanded={false}
                  >
                    {peopleDetail.biography}
                  </ShowMoreText>
                )}
                <div className="d-block d-xl-none mt-4">
                  <PersonalInfo peopleDetail={peopleDetail} />
                </div>

                <MoviePersonRow
                  title="Known For"
                  character
                  showThree
                  movieList={peopleCredit.knownFor}
                />

                <div className="d-none d-xl-block pb-3">
                  {peopleCredit.acting && peopleCredit.acting.length > 0 && (
                    <React.Fragment>
                      <h3 className="d-none d-xl-block pb-3 pt-2 movie-person-row-title">
                        Acting
                      </h3>
                      <div className="table-card">
                        {peopleCredit.acting.map((movie, i) => {
                          let previousItem;
                          if (i > 0) previousItem = peopleCredit.acting[i - 1];
                          return this.getRow(movie, previousItem);
                        })}
                      </div>
                    </React.Fragment>
                  )}
                  {Array.from(Object.keys(peopleCredit.crew)).map(cat => (
                    <React.Fragment>
                      <div className="pb-3">
                        <React.Fragment>
                          <h3 className="d-none d-xl-block pb-3 pt-4 movie-person-row-title">
                            {cat}
                          </h3>
                        </React.Fragment>
                        <div className="table-card">
                          {peopleCredit.crew[cat].map((movie, i) => {
                            let previousItem;
                            if (i > 0)
                              previousItem = peopleCredit.crew[cat][i - 1];
                            return this.getRow(movie, previousItem);
                          })}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
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

const PersonalInfo = ({ peopleDetail }) => {
  return (
    <React.Fragment>
      <h4 className="text-center text-white py-3 d-none d-xl-block">
        Personal Info
      </h4>
      {peopleDetail.known_for_department && (
        <DetailRow
          title="Known For"
          description={peopleDetail.known_for_department}
        />
      )}
      {(peopleDetail.gender !== 0) && (
        <DetailRow
          title="Gender"
          description={peopleDetail.gender === 2 ? "Male" : "Female"}
        />
      )}
      {peopleDetail.birthday && (
        <DetailRow title="Birthday" description={peopleDetail.birthday} />
      )}
      {peopleDetail.place_of_birth && (
        <DetailRow
          title="Place of Birth"
          description={peopleDetail.place_of_birth}
        />
      )}
      {peopleDetail.deathday && (
        <DetailRow title="Death day" description={peopleDetail.deathday} />
      )}
    </React.Fragment>
  );
};

const DetailRow = ({ title, description }) => (
  <React.Fragment>
    <div className="title-text">{title}</div>
    <div className="description-text pb-3">{description}</div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  isPeopleDetailLoading: state.movieDetailReducer.isPeopleDetailLoading,
  peopleDetail: state.movieDetailReducer.peopleDetail,
  peopleCredit: state.movieDetailReducer.peopleCredit,
  peopleExternal: state.movieDetailReducer.peopleExternal,
  isPeopleDetailError: state.movieDetailReducer.isPeopleDetailError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getPeopleDetail: movieDetailActions.getPeopleDetail
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PeopleDetail));
