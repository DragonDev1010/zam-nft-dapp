import { ModalContext, WalletContext } from "@src/context";
import { IconCheckMark } from "@src/icons/icons";
import React, { useContext, useState } from "react";

export const LoginBody = () => {
  const { wallet } = useContext(WalletContext);
  const [agreement, setAgreement] = useState(wallet?.address !== "");
  const { modalLoginIsOpen, setModalLoginOpen } = useContext(ModalContext);

  return (
    <div className="login-body">
      <div className="login-body__registration">
        <div className="login-body__registration__wallet">
          <div className="login-body__registration__wallet__title">Wallet Address</div>
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
        </div>
        <div className="login-body__registration__caution">
          <img src="/images/profile/caution.png" />
          <p>
            Please note that once registered you <span>will not be able</span> to change your wallet address.
          </p>
        </div>
        <div className="login-body__registration__input">
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
        <div className="login-body__registration__input">
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
        <div className="login-body__registration__input">
          <label className="input-field__label">Confirm Password</label>
          <div className="input-field mt-10">
            <div className="input-field__column buttons-switcher">
              <input
                className="input-field__input"
                type="password"
                //    onChange={(e) => setDeadline(int(e.target.value))}
                //    value={deadline || ''}
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>
        <label className="modal__wallet-agreement mt-20">
          <div className="checkbox">
            <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)} />
            <IconCheckMark />
          </div>
          <div className="checkbox-label">
            By using zam.io you agree to our{" "}
            <a href="https://zam.io/docs/debe5b38c66e212ac7afddf8293af433.pdf" target="_blank">
              Terms and Conditions
            </a>{" "}
            along with our{" "}
            <a href="https://zam.io/docs/5e7b377cde8403176232a4cff7b679b4.pdf" target="_blank">
              Privacy Policy
            </a>{" "}
            and any other applicable documents.
          </div>
        </label>
        <button>Create Account</button>
      </div>
      <div className="login-body__line"></div>
      <div className="login-body__signin">
        <div className="login-body__signin__title">Already Registered?</div>
        <button onClick={setModalLoginOpen}>Sign In</button>
      </div>
    </div>
  );
};
