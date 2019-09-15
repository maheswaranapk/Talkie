import React from "react";
import { Helmet } from "react-helmet";

const DefaultHelmet = ({ onClick }) => {
  return (
    <Helmet>
      <title>{"Talkie"}</title>
      <meta name="title" content="Talkie" />
      <meta name="og:description" content="Talkie is a site to explore movies and its details." />
      <meta name="description" content="Talkie is a site to explore movies and its details." />
    </Helmet>
  );
};

export default DefaultHelmet;
