import React from "react";

export const StatsItem = ({ imgUrl, title, subtitle }) => {
  return (
    <div className="profile-body__top-cards__stats__items__item">
      <img src={imgUrl} />
      <div className="profile-body__top-cards__stats__items__item__data">
        <div className="profile-body__top-cards__stats__items__item__data__title">{title}</div>
        <div className="profile-body__top-cards__stats__items__item__data__subtitle">{subtitle}</div>
      </div>
    </div>
  );
};
