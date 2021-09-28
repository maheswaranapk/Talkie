import React from "react";
import { Helmet } from "react-helmet";

const MetaHelmet = ({ title, description, image }) => {
  console.log({ title, description, image });
  return (
    <Helmet>
      <title>{title + " - Talkie "}</title>

      <meta name="title" content={title + " - Talkie "} />
      <meta name="og:title" content={title + " - Talkie "} />
      <meta name="twitter:title" content={title + " - Talkie "} />

      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:creator" content={"@maheswaranapk"} />

      <meta name="image" content={image} />
      <meta name="og:image" content={image} />
      <meta name="twitter:image" content={image} />

      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
    </Helmet>
  );
};

export default MetaHelmet;
