import React from "react";
import "./Loader.scss";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 loader-wrapper">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Fetching...</span>
      </div>
    </div>
  );
}
