import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink, Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { withRouter } from "react-router-dom";
import homeService from "../../services/home.service";
import debounce from "lodash.debounce";
import Tag from "../../constants/tag.constants";

import "./MenuBar.scss";

const customStyles = {
  control: (base, state) => ({
    ...base,
    "&:hover": { borderColor: "#c62828" },
    border: "1px solid lightgray",
    boxShadow: "none",
    backgroundColor: "#f1f3f4"
  }),
  indicatorSeparator: () => {}, // removes the "stick"
  dropdownIndicator: defaultStyles => ({
    ...defaultStyles,
    display: "none"
  }),
  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: "pointer",
      backgroundColor: isFocused ? "#c62828" : "white",
      color: isFocused ? "rgba(255, 255, 255)" : "#c62828",
      fontWeight: isFocused ? "700" : "400"
    };
  }
};

const loadOptions = (inputValue, callback) => {
  if (!inputValue || inputValue.length === 0) {
    callback([]);
    return;
  }

  homeService
    .multiSearch(inputValue)
    .then(response => {
      if (response.data.results.length === 0) {
        callback([]);
        return;
      } else if (response.data.results.length >= 4) {
        response.data.results = response.data.results.slice(0, 4);
      }

      let options = response.data.results.map(result => ({
        // value: result.id,
        result: result,
        value: { media_type: result.media_type, id: result.id },
        label1: result.media_type === "movie" ? result.title : result.name,
        label: (
          <div>
            <i
              className={
                "pr-2 auto-complete-image " +
                (result.media_type === "person"
                  ? "fas fa-user"
                  : result.media_type === "movie"
                  ? "fas fa-film"
                  : "fas fa-tv")
              }
              alt={result.media_type === "movie" ? result.title : result.name}
            />
            {result.media_type === "movie" ? result.title : result.name}
          </div>
        )
      }));
      options.push({
        value: null,
        inputValue: inputValue,
        label: 'Show Movie Results for "' + inputValue + '"',
        param: "?type=" + Tag.MOVIE + "&page=1"
      });
      options.push({
        value: null,
        inputValue: inputValue,
        label: 'Show TV Show Results for "' + inputValue + '"',
        param: "?type=" + Tag.TV + "&page=1"
      });
      options.push({
        value: null,
        inputValue: inputValue,
        label: 'Show People Results for "' + inputValue + '"',
        param: "?type=" + Tag.PEOPLE + "&page=1"
      });

      callback(options);
    })
    .catch(function(error) {
      // console.log(error);
    });
};

class MenuBar extends React.Component {
  showSettings = event => {
    event.preventDefault();
  };

  state = {
    selectedOption: null,
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };
  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };

  handleChange = selectedOption => {
    
    if (selectedOption.value) {
      if (selectedOption.value.media_type === "movie")
        this.props.history.push("/movie/" + selectedOption.value.id);
      else if (selectedOption.value.media_type === "tv")
        this.props.history.push("/tv/" + selectedOption.value.id);
      else if (selectedOption.value.media_type === "person")
        this.props.history.push("/people/" + selectedOption.value.id);
    } else {
      this.props.history.push(
        "/search/" + selectedOption.inputValue + selectedOption.param
      );
    }
    this.setState({ selectedOption: null });
    this.forceUpdate();
  };

  getAsyncSelect = placeholder => {
    const { selectedOption } = this.state;
    return (
      <AsyncSelect
        className="text-primary"
        placeholder={placeholder}
        onChange={this.handleChange}
        openMenuOnClick={true}
        value={selectedOption}
        classNamePrefix="select"
        styles={customStyles}
        loadOptions={debounce(loadOptions, 100)}
        cacheOptions
        defaultOptions
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <header className="fixed-top d-none d-lg-block desktop-menu">
          <nav className="navbar d-flex flex-row justify-content-between align-items-center flex-nowrap">
            <Link to={"/"} className="logo nav-title" href="#">
              TALKIE
            </Link>
            <div className="d-none d-xl-block col-3 col-lg-4 col-xl-5">
              {this.getAsyncSelect("Search Movies, TV Shows, People here...")}
            </div>
            <div className="d-none d-lg-block d-xl-none col-3 col-lg-4 col-xl-5">
              {this.getAsyncSelect("Search here...")}
            </div>
            <div className="navbar-nav d-flex flex-row">
              <NavLink
                to={"/"}
                exact
                activeClassName="active"
                className={"nav-link pl-3 pr-3 p-0"}
              >
                HOME
              </NavLink>
              <NavLink
                to={"/movie-list"}
                exact
                activeClassName="active"
                className={"nav-link pl-3 pr-3 p-0"}
              >
                MOVIES
              </NavLink>
              <NavLink
                to={"/tv-list"}
                exact
                activeClassName="active"
                className={"nav-link pl-3 pr-3 p-0"}
              >
                TV SHOWS
              </NavLink>
              <NavLink
                to={"/filter"}
                exact
                activeClassName="active"
                className={"nav-link pl-3 pr-3 p-0"}
              >
                FILTER
              </NavLink>
            </div>
          </nav>
        </header>
        <div className="fixed-top d-block d-lg-none mobile-menu">
          <nav className="navbar d-flex flex-row justify-content-between align-items-center flex-nowrap p-2">
            <Menu
              isOpen={this.state.menuOpen}
              onStateChange={state => this.handleStateChange(state)}
            >
              <NavLink
                to={"/"}
                exact
                onClick={this.toggleMenu}
                className="menu-item"
              >
                HOME
              </NavLink>
              <NavLink
                to={"/movie-list"}
                exact
                onClick={this.toggleMenu}
                className="menu-item"
              >
                MOVIES
              </NavLink>
              <NavLink
                to={"/tv-list"}
                exact
                onClick={this.toggleMenu}
                className="menu-item"
              >
                TV SHOWS
              </NavLink>
              <NavLink
                to={"/filter"}
                exact
                onClick={this.toggleMenu}
                className="menu-item"
                href="#"
              >
                FILTER
              </NavLink>
            </Menu>

            <div className="col-8 col-md-6">
              {this.getAsyncSelect("Search here...")}
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MenuBar);
