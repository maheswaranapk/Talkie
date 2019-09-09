import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage";
import ListPage from "./pages/ListPage/ListPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PeopleDetail from "./pages/PeopleDetail/PeopleDetail";
import Filter from "./pages/Filter/Filter";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App d-flex flex-column">
        <MenuBar />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/movie-list"
              component={() => <ListPage isMovie={true} />}
            />
            <Route
              exact
              path="/tv-list"
              component={() => <ListPage isMovie={false} />}
            />
            <Route
              exact
              path="/movie-detail/:id"
              component={() => <DetailPage isMovie={true} />}
            />
            <Route
              exact
              path="/tv-detail/:id"
              component={() => <DetailPage isMovie={false} />}
            />
            <Route
              exact
              path="/search/:id"
              component={() => <SearchPage isMovie={false} />}
            />
            <Route exact path="/people-detail/:id" component={PeopleDetail} />
            <Route exact path="/filter" component={Filter} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});

App.propTypes = {
  // openDashboardFilter: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
