import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink, Link } from "react-router-dom";
import "./MenuBar.scss";

export default class MenuBar extends React.Component {
  showSettings = event => {
    event.preventDefault();
  };
  render() {
    return (
      <React.Fragment>
        <div className="fixed-top d-none d-lg-block desktop-menu">
          <nav className="navbar d-flex flex-row justify-content-between align-items-center flex-nowrap">
            <Link to={"/"} className="logo nav-title" href="#">
              TALKIE
            </Link>
            <input
              className="form-control col-3 col-lg-4 col-xl-5 text-primary"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
            />
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
                to={"/movie-filter"}
                exact
                activeClassName="active"
                className={"nav-link pl-3 pr-3 p-0"}
              >
                FILTER
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="fixed-top d-block d-lg-none mobile-menu">
          <nav className="navbar d-flex flex-row justify-content-between align-items-center flex-nowrap p-2">
            <Menu>
              <a id="home" className="menu-item" href="#">
                HOME
              </a>
              <a id="about" className="menu-item" href="#">
                MOVIES
              </a>
              <a id="contact" className="menu-item" href="#">
                TV SHOWS
              </a>
              <a id="contact" className="menu-item" href="#">
                FILTER
              </a>
            </Menu>

            <input
              className="form-control col-8 col-md-6 text-primary"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
            />
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
