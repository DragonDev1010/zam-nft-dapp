import React from "react";

export const FinalStage = ({ level, beltColor, nftCount, soldAlloc }) => {
  return (
    <div className="profile-card">
      <div className="profile-card__title">
        <img className="profile-card__title-icon" src="./images/profile/profile.png" /> <span className="profile-card__title-text">Sale is finished or paused</span> 
      </div>
      <div className="profile-card__level">
        <div className="profile-card__level-title">
          {level} lvl <span className="profile-card__level-color">{beltColor}</span>
        </div>
        <div className="profile-card__level-count">{nftCount} NFT </div>
      </div>
      <div className="profile-card__info">
        <div className="profile-card__info-item">
          <div className="profile-card__info-key">Bought out allocation:</div>
          <div className="profile-card__info-value">{soldAlloc} $</div>
        </div>
      </div>
    </div>
  );
};