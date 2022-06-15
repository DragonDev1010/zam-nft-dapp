import React from "react";

export const StatsItem = ({ imgUrl, title, subtitle }) => {
  return (
    <div className="profile-card__stats-item">
      <img className="profile-card__stats-img" src={imgUrl} />
      <div className="profile-card__stats-data">
        <div className="profile-card__stats-title">{title}</div>
        <div className="profile-card__stats-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};
