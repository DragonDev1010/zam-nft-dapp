import React from "react";

export const NftCard = ({ level, amount, amountTitle, subtitle, isActive }) => {
  return (
    <div className={isActive ? "nft-card active" : "nft-card "}>
      <div className="nft-card__level">
        <div className={isActive ? "nft-card__level__img active" : "nft-card__level__img "}>
          <img src={`../images/nft/levels/level-${level}.png`} alt="" />
        </div>
        <div className="nft-card__level__title">
          <div className={isActive ? "nft-card__level__title__num active" : "nft-card__level__title__num"}>{level}</div>
          <div className={isActive ? "nft-card__level__title__desc active" : "nft-card__level__title__desc"}>lvl</div>
        </div>
      </div>
      <div className="nft-card__title">
        {" "}
        <span>{amount}</span> {amountTitle}
      </div>
      <div className="nft-card__subtitle">{subtitle}</div>
    </div>
  );
};
