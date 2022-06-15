import React from "react";

export const Header = () => {
  return (
    <>
      <div className="whitelist-head">
        <a className="whitelist-head__logo" href="/">
          <img src="./images/logo_zamio.svg" className="whitelist-head__logo-img" alt="Zamio"/>
        </a>
        <div className="whitelist-head__right">
          <div className="whitelist-head__title">Whitelist Application Form for <span className="whitelist-head__title-span">Oracula</span>
          </div>
          <div className="whitelist-head__end">Applications close on: <span className="whitelist-head__end-span">April 13</span>
          </div>
        </div>
      </div>
    </>
  );
};
