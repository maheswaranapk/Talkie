import React from "react";
import "./VideoCard.scss"

const VideoCard = ({trailerId, title}) => (<iframe
src={"https://www.youtube.com/embed/" + trailerId}
allowFullScreen
title={title + " Trailer"}
/>)

export default VideoCard;