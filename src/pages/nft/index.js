import React, { useContext, useState, useEffect } from "react";
import { Header } from "./header";
import { NftBody } from "./body";

export const NftPage = () => {
  return (
    <article>
      <div className="nft-container">
        <Header />
        <NftBody />
      </div>
    </article>
  );
};