import React from "react";

export const Round1 = ({
  level,
  beltColor,
  nftCount,
  soldAlloc,
  yourAlloc,
  roundOneHandler,
  pauseState,
  disabledButton,
}) => (
  <div className="profile-card">
    <div className="profile-card__title">
      <img
        className="profile-card__title-icon"
        src="./images/profile/profile.png"
      />{" "}
      <span className="profile-card__title-text">Profile Rank</span>
    </div>
    <div className="profile-card__level">
      <div className="profile-card__level-title">
        {level} lvl{" "}
        <span className="profile-card__level-color">{beltColor}</span>
      </div>
      <div className="profile-card__level-count">{nftCount} NFT </div>
    </div>
    <div className="profile-card__info">
      <div className="profile-card__info-item">
        <div className="profile-card__info-key">Bought out allocation:</div>
        <div className="profile-card__info-value">{soldAlloc} $</div>
      </div>
      <div className="profile-card__info-item">
        <div className="profile-card__info-key">
          Your allocation at round 1:
        </div>
        <div className="profile-card__info-value">{yourAlloc}</div>
      </div>
    </div>
    {disabledButton ? (
      <button className="button-disabled" disabled>
        Your Round1 complete
      </button>
    ) : (
      <button
        className="button"
        disabled={pauseState}
        onClick={roundOneHandler}
      >
        Buy allocation
      </button>
    )}
  </div>
);
