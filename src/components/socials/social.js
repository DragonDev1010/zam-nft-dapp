import React from "react";

export const Socials = ({ children }) => {
  return (
    <div className="sol">
      {children}
      <button className="sol__button">
          <img className="sol__button-img" src="images/zam-pad/info.svg" />
      </button>
    </div>
  );
};