import React from "react";

export const Footer = () => {
  return (
    <div className="footer w-100 d-flex flex-column justify-content-between">
      <div className="text-center">
        <b>Powered by TMDB</b>
        <br />
        Mahes Sivakumar © 2019 | All rights reserved <br />
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </div>
      <img
        className="float-left ml-3 d-none d-lg-block"
        src="/images/tmdb.png"
        alt="Powered By TMDB"
        height="60"
        width="120"
      />
    </div>
  );
};
