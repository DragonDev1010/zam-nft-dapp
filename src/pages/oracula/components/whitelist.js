import React from "react";

export const Whitelist = ({ level, beltColor, nftCount, participants, handleJoin, disabledButton }) => {
  return (
    <div className="profile-card">
      <div className="profile-card__title">
        <img className="profile-card__title-icon" src="./images/profile/profile.png" /> <span className="profile-card__title-text">Join to whitelist</span>
      </div>
      <div className="profile-card__level">
        <div className="profile-card__level-title">
          {level} lvl <span className="profile-card__level-color">{beltColor}</span>
        </div>
        <div className="profile-card__level-count">{nftCount} NFT </div>
      </div>
      <div className="profile-card__info">
        <div className="profile-card__info-item">
          <div className="profile-card__info-key">Participants:</div>
          <div className="profile-card__info-value">{participants} </div>
        </div>
      </div>
      {disabledButton
        ? <button type="button" disabled className="button-disabled" onClick={handleJoin}>You follow</button>
        : <button type="button" className="button" onClick={handleJoin}>Join to whitelist</button>
      }
    </div>
  )
};