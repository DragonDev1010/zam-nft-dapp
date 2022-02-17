import { WalletContext } from "@src/context";
import React, { useContext } from "react";

export const LoginModal = () => {
  const { wallet } = useContext(WalletContext);
  return (
    <div className="login-modal">
      <div className="login-modal__title">Sign In</div>
      <div className="login-body__registration__wallet__info">
        <div className="login-body__registration__wallet__info__address">
          <div className="button-wallet__icon">
            {wallet.type === "metamask" ? (
              <img src="/images/icon_metamask.svg" />
            ) : wallet.type === "binance" ? (
              <img src="/images/tokens/icon_token_bsc.svg" />
            ) : wallet.type === "walletconnect" ? (
              <img src="/images/icon_walletconnector.svg" />
            ) : (
              ""
            )}
          </div>
          <span>{`${String(wallet.address).substring(0, 5)}...${String(wallet.address).substring(30)}`}</span>
        </div>
        <div className="login-body__registration__wallet__info__status">Connected</div>
      </div>
      <div className="login-modal__input">
        <label className="input-field__label">Email Address</label>
        <div className="input-field mt-10">
          <div className="input-field__column buttons-switcher">
            <input
              className="input-field__input"
              //    onChange={(e) => setDeadline(int(e.target.value))}
              //    value={deadline || ''}
              placeholder="Enter Email"
            />
          </div>
        </div>
      </div>
      <div className="login-modal__input">
        <label className="input-field__label">Password</label>
        <div className="input-field mt-10">
          <div className="input-field__column buttons-switcher">
            <input
              className="input-field__input"
              type="password"
              //    onChange={(e) => setDeadline(int(e.target.value))}
              //    value={deadline || ''}
              placeholder="Enter Password"
            />
          </div>
        </div>
      </div>
      <a className="login-modal__forgot" href="#">
        Forgot Password?
      </a>
      <button>Sign In</button>
      <div className="login-modal__line"> </div>
      <div className="login-modal__create">
        <p>
          Haven’t registered? <span>Create free new account</span>
        </p>{" "}
      </div>
    </div>
  );
};
