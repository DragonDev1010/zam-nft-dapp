import React from "react";

export const Round = ({ number, title, subtitle, status, isActive }) => (
  <div className="highstreet-body__cards__left__rounds__info">
    <div className="highstreet-body__cards__left__rounds__info__description">
      <div
        className={
          number == "5" && isActive
            ? "highstreet-body__cards__left__rounds__info__description__number active remove-line"
            : isActive
            ? "highstreet-body__cards__left__rounds__info__description__number  active "
            : "highstreet-body__cards__left__rounds__info__description__number"
        }
      >
        <span></span>
        {number}
      </div>
      <div className="highstreet-body__cards__left__rounds__info__description__wrapper">
        <div className="highstreet-body__cards__left__rounds__info__description__title">{title}</div>
        <div className="highstreet-body__cards__left__rounds__info__description__subtitle">{subtitle}</div>
      </div>
    </div>
    <div className="highstreet-body__cards__left__rounds__info__status">{status}</div>
  </div>
);
