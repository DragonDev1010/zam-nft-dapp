import React from "react";
import { Link } from "react-router-dom";

export const Prepare = ({ verifyWallet }) => {
  return (
    <div className="profile-card">
      <div className="profile-card__title">
        <img
          className="profile-card__title-icon"
          src="./images/profile/profile.png"
        />{" "}
        <span className="profile-card__title-text">Prepare for sale</span>
      </div>
      <div className="profile-card__buttons">
        <div className="profile-card__btn">
          <Link to="staking" className="profile-card__btn-link">
            Stake ZAM
          </Link>
        </div>
        <div className="profile-card__btn">
          <a
            href="https://pancakeswap.finance/swap?outputCurrency=0xBbcF57177D8752B21d080bf30a06CE20aD6333F8"
            className="profile-card__btn-link"
          >
            Buy ZAM
          </a>
        </div>
        <div className="profile-card__btn">
          <Link to="nft" className="profile-card__btn-link">
            Mint NFT
          </Link>
        </div>
        <div className="profile-card__btn">
          <button
            onClick={verifyWallet}
            href="#"
            className="profile-card__btn-link"
          >
            Verify Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
