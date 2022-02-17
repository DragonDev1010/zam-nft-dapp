import React from "react";
import { NftHeaderCarouselComponent } from "@src/components/nft-header-carousel";

export const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-container__item nft-header">
          {/* <p className="nft-header__title">TrillioHeirs</p> */}
          <img src="/images/nft/TrillioHeirs.png" />
          <p className="nft-header__title">
            TrillioHeirs 8 888 Unique NFTs with Utility for ZAMpad and Your Ticket to ZAM.DAO
          </p>
          <p className="header-earn-container">Only ERC20.</p>
        </div>
        <div className="header-container__item nft-header__carousel">
          <NftHeaderCarouselComponent />
        </div>
      </div>
    </>
  );
};
