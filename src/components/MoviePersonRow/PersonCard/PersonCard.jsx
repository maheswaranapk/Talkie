import React from "react";
import api from "../../../constants/api.constant.js";
import { Link } from "react-router-dom";

import "./PersonCard.scss";

const PersonCard = ({ person, row }) => {
  return (
    <div className={(row ? "col-6 col-lg-3 col-md-4" : "col-poster") + " my-3"}>
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
          <div className="person-row-info w-100 p-3 text-light">
            {person.name && (
              <h5 className="pb-1 text-center character-cast-name">
                {person.name}
              </h5>
            )}
            {person.known_for_department && (
              <div className="text-center">{person.known_for_department}</div>
            )}
            {person.character && (
              <div className="text-center character-name">
                {person.character}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PersonCard;
