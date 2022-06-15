import React, { useContext } from "react";
import Countdown from "react-countdown";

export const Project = ({ title, subtitle, imgUrl }) => {
  return (
    <>
      <div className="profile-card__project">
        <img className="profile-card__project-img" src={imgUrl} />
        <div className="profile-card__project-info">
          <div className="profile-card__project-title">{title}</div>
          <div className="profile-card__project-date">
            Sale Ends in: {<Countdown date={Date.now() + 86400000} />}
          </div>
        </div>
      </div>
    </>
  );
};
