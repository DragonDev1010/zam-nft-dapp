import React from "react";

export const SocialItem = ({ img, title, subtitle, btn1, btn2, isActiveBtn }) => {
  return (
    <div className="whitelist-body__card__socials__item">
      <div className="whitelist-body__card__socials__item__name">
        <img src={img} />
        <div className="whitelist-body__card__socials__item__name__title-wrapper">
          <div className="whitelist-body__card__socials__item__name__title-wrapper__title">{title}</div>
          <div className="whitelist-body__card__socials__item__name__title-wrapper__subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="whitelist-body__card__socials__item__buttons">
        <button className="whitelist-body__card__socials__item__buttons__go-btn">{btn1}</button>
        <button className="whitelist-body__card__socials__item__buttons__did-btn">
          {btn2} {isActiveBtn && <span>✅</span>}
        </button>
      </div>
    </div>
  );
};
