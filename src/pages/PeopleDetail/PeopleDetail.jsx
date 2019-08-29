import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import movieDetailActions from "../../store/actions/movie-detail.action";
import api from "../../constants/api.constant.js";
import MoviePersonRow from "../../components/MoviePersonRow/MoviePersonRow";
import ExternalID from "../../components/ExternaIId/ExternalId";
import Loader from "../../components/Loader/Loader";
import { Footer } from "../../components/Footer/Footer";
import ShowMoreText from 'react-show-more-text';

import "./PeopleDetail.scss";

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
    const { path, peopleId } = this.state;
    this.props.actions.getPeopleDetail(path + peopleId);
  }

  render() {
    const {
      peopleDetail,
      peopleCredit,
      peopleExternal,
      isMovieDetailLoading
    } = this.props;

    console.log(peopleDetail);

    return (
      <React.Fragment>
        {isMovieDetailLoading && <Loader />}
        {peopleDetail && peopleCredit && (
          <div
            className="position-relative  d-flex justify-content-center people-detail-container"
            style={{
              backgroundImage:
                "url(" +
                api.imagePosterUrl +
                peopleCredit.cast[0].backdrop_path +
                ")"
            }}
          >
            <div className="container row people-detail-container people-detail">
              <div className="col-12 col-lg-4 people-detail-poster-container t-pt-4 d-flex flex-column">
                <img
                  src={
                    peopleDetail.profile_path
                      ? api.imageUrl + peopleDetail.profile_path
                      : "/images/default-profile.png"
                  }
                  alt={`${peopleDetail.name} poster`}
                  className="people-profile-image border-radius t-mb-4"
                />
                <h4 className="text-center text-white t-pt-4 t-pb-4">
                  Personal Info
                </h4>
                {peopleDetail.known_for_department && (
                  <DetailRow
                    title="Known For"
                    description={peopleDetail.known_for_department}
                  />
                )}
                {peopleDetail.gender && (
                  <DetailRow
                    title="Gender"
                    description={
                      peopleDetail.gender === 2 ? "Male" : "Female"
                    }
                  />
                )}
                {peopleDetail.birthday && (
                  <DetailRow
                    title="Birthday"
                    description={peopleDetail.birthday}
                  />
                )}
                {peopleDetail.place_of_birth && (
                  <DetailRow
                    title="Place of Birth"
                    description={peopleDetail.place_of_birth}
                  />
                )}
                {peopleDetail.deathday && (
                  <DetailRow
                    title="Death day"
                    description={peopleDetail.deathday}
                  />
                )}
                {peopleExternal && <ExternalID external={peopleExternal} />}
              </div>
              <div className="col-12 col-lg-8 text-light t-pt-4 pb-5">
                {peopleDetail.name && (
                  <h1 className="t-pt-4  t-pb-4 ">{peopleDetail.name}</h1>
                )}
                {peopleDetail.biography && (
                  <ShowMoreText
                    className="t-pt-2 text-justify people-overview t-pb-4"
                    lines={3}
                    more="Show more"
                    less="Show less"
                    expanded={false}
                  >
                    {peopleDetail.biography}
                  </ShowMoreText>
                )}
                <MoviePersonRow
                  title="Movies"
                  character
                  showThree
                  movieList={peopleCredit.cast}
                />
              </div>

              <Footer />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const DetailRow = ({ title, description }) => (
  <React.Fragment>
    <div className="title-text">{title}</div>
    <div className="description-text t-pb-4">{description}</div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  isPeopleDetailLoading: state.movieDetailReducer.isPeopleDetailLoading,
  peopleDetail: state.movieDetailReducer.peopleDetail,
  peopleCredit: state.movieDetailReducer.peopleCredit,
  peopleExternal: state.movieDetailReducer.peopleExternal,
  isPeopleDetailError: state.movieDetailReducer.isMovieDetailError
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
