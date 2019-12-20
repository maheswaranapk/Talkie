import React from "react";
import { Link } from "react-router-dom";

import "../PersonCard/PersonCard.scss";

const CrewCard = ({ crew }) => {
  return (
    <div className="col-6 col-lg-4 py-3">
      <Link to={"/people-detail/" + crew.id}>
        <div className="crew-row-parent h-100 d-flex flex-column border-radius cursor-pointer">
          <div className="crew-row-info w-100 text-light">
            {crew.name && <h5 className="pb-1 text-center">{crew.name}</h5>}
            {crew.job && (
              <div className="text-center job-title">{crew.job}</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CrewCard;
