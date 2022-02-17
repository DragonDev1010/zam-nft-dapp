import React, { useContext } from "react";

export const Project = ({ title, subtitle, imgUrl }) => {
  return (
    <>
      <div className="profile-body__bottom-cards__card__project">
        <img src={imgUrl} />
        <div className="profile-body__bottom-cards__card__project__info">
          <div className="profile-body__bottom-cards__card__project__info__title">Sidus Heroes</div>
          <div className="profile-body__bottom-cards__card__project__info__date">Sale Ends in: 3:0:15:17</div>
        </div>
      </div>
    </>
  );
};
