import React, { useContext } from "react";
import Countdown from "react-countdown";

export const Project = ({ title, subtitle, imgUrl }) => {
  return (
    <>
      <div className="profile-body__bottom-cards__card__project">
        <img src={imgUrl} />
        <div className="profile-body__bottom-cards__card__project__info">
          <div className="profile-body__bottom-cards__card__project__info__title">Sidus Heroes</div>
          <div className="profile-body__bottom-cards__card__project__info__date">
            Sale Ends in: {<Countdown date={Date.now() + 86400000} />}
          </div>
        </div>
      </div>
    </>
  );
};
