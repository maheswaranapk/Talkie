import React from "react";

const ErrorView = ({ onClick }) => {
  return (
    <div className="error-container h-w-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-primary mb-2">☹</h1>
      <h4 className="text-primary mb-4">Unable to Fetch now. Try Again...</h4>
      <button
        type="button"
        className="btn font-weight-bold btn-outline-primary pl-5 pr-5 pt-2 pb-2"
        onClick={onClick}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
