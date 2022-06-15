import React from "react";

export const Round2 = ({ level, beltColor, nftCount, soldAlloc, yourAlloc, buyHandler, pauseState, round2Number, setRound2Number }) => {

  const handleNumber = (e) => {
    setRound2Number(e.target.value)
  }
 
  return (
    <div className="profile-card">
      <div className="profile-card__title">
        <img className="profile-card__title-icon" src="./images/profile/profile.png" /> <span className="profile-card__title-text">Take part in round 2</span> 
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
        <div className="profile-card__input">
          <div className="input-field__label">How much?</div>
          <div className="input-field mt-10">
            <input 
              className="input-field__input"
              name="allocValue"
              placeholder="0"
              type="number"
              onChange={handleNumber}
              value={round2Number}
              min={0}
              autoFocus
            />
          </div>
        </div>
      </div>
      <button className="button" disabled={pauseState} onClick={() => buyHandler(round2Number)}>Buy allocation</button>
    </div>
  );
};
