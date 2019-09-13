import React from "react";
import { Helmet } from "react-helmet";

const DefaultHelmet = ({ onClick }) => {
  return (
    <Helmet>
      <title>{"Talkie"}</title>
      <meta content="" name="og:title" />
      <meta name="title" content="" />
      <meta name="og:description" content="" />
    </Helmet>
  );
};

export default DefaultHelmet;
