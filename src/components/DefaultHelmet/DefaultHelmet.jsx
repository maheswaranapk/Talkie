import React from "react";
import { Helmet } from "react-helmet";

const DefaultHelmet = ({ onClick }) => {
  return (
    <Helmet>
      <title>{"Talkie"}</title>
      <meta name="title" content="Talkie" />
      <title>Talkie</title>
      <meta
        name="og:description"
        content="Talkie is a site to explore movies. Powered by TMDB."
      />
      <meta
        name="description"
        content="Talkie is a site to explore movies. Powered by TMDB.">
    
        </meta>
      
    <meta
        name="keywords"
        content="Movies, TV Shows, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
      >

      </meta>
      
      <meta name="image" content="https://talkie.appybot.in/favicon.ico" />
      <meta
        property="og:image"
        content="https://talkie.appybot.in/favicon.ico"
      />
    </Helmet>
  );
};

export default DefaultHelmet;
