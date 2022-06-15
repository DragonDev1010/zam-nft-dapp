import React from "react";

export const SocialLink = ({ href, imgUrl }) => {
  return (
    <a className="sol__link" href={href} target="_blank">
      <img
        className="sol__img"
        src={imgUrl}
      />
    </a>
  );
};