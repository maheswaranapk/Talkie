import React from "react";
import "./ExternalID.scss";

const ExternalID = ({ external }) => (
  <div className="d-none d-lg-flex flex-row w-100 mb-5">
    {external.imdb_id && (
      <i
        onClick={() =>
          window.open(
            "https://www.imdb.com/"+(external.imdb_id.startsWith("nm") ? "name" : "title")+"/" + external.imdb_id,
            "_blank"
          )
        }
        className="fab fa-imdb imdb-img fa-4x t-mr-4 cursor-pointer"
      />
    )}
    {external.twitter_id && (
      <i
        onClick={() =>
          window.open("https://twitter.com/" + external.twitter_id, "_blank")
        }
        className="fab fa-twitter twitter-img fa-4x t-mr-4 cursor-pointer"
      />
    )}
    {external.instagram_id && (
      <i
        onClick={() =>
          window.open(
            "https://www.instagram.com/" + external.instagram_id,
            "_blank"
          )
        }
        className="fab fa-instagram instagram-img fa-4x t-mr-4 cursor-pointer"
      />
    )}
  </div>
);

export default ExternalID;
