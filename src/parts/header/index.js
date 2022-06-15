import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { StakingAction } from "@src/actions/stakingAction";
import { ModalContext, UserContext, WalletContext } from "@src/context";
import { useAuth } from "../../hooks/auth";
import { toFixed } from "@src/utils";

import { NetworkSwitcher } from "@src/components/network-switcher";

import { IconLogOut } from "../../icons/icons";

const Header = () => {
  const { setModalWalletOpen, setModalLoginOpen } = useContext(ModalContext);
  const { wallet, walletError } = useContext(WalletContext);
  const { userObj, setUserObj } = useContext(UserContext);
  const stakeAction = new StakingAction(wallet);
  const auth = useAuth();
  const [dropdownActive, setDropdownActive] = useState();
  const [zamValue, setZamValue] = useState(0);
  const refs = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (refs.current && !refs.current.contains(event.target)) {
        setDropdownActive(false);
      }
    }

    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownActive]);

  useEffect(async () => {
    const zamWallet = await stakeAction.getBalance();

    setZamValue(toFixed(zamWallet.balance) ?? 0)
  }, [wallet])
  
  const logout = () => {
    auth.logout();
    setUserObj();
  };

  return (
    <>
      <Link to="/nft" className="top-banner">
        <img src="./images/banners/top_nft_2x.png" className="hidden-sm" />
        <img
          src="./images/banners/top_nft_mobile_2x.png"
          className="visible-sm"
        />
      </Link>
      <header className="site-header">
        <div className="site-header__left">
          <Link to="/">
            <img
              src="./images/logo_zamio.svg"
              className="site-header__logo"
              alt="Zamio"
            />
          </Link>

          <div className="site-header__center">
            <nav className="site-header__nav">
              <ul>
                <li>
                  <a href="https://zam.io/token">$ZAM</a>
                </li>
                <li>
                  <a href="https://zam.io/wallet">ZamWallet</a>
                </li>
                <li>
                  <a href="https://babylon.zam.io/">Babylon</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="site-header__right">
          {!wallet.address || (
            <>
              <NetworkSwitcher wallet={wallet} />
            </>
          )}

          <div
            className={`site-header__wallets ${
              wallet.address ? "site-header__wallets_connected" : ""
            }`}
          >
            {wallet.address ? (
              <div className="site-header__zam">
                <div className="site-header__zam-content">
                  <img
                    src="./images/tokens/icon_token_zam.svg"
                    className="site-header__zam-icon"
                  />
                  <span className="site-header__zam-count">{zamValue}</span>

                  <span className="site-header__zam-text">ZAM</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              className={`button-wallet ${
                wallet.address ? "button-wallet_connected" : ""
              }`}
              onClick={() => setModalWalletOpen(true)}
            >
              {wallet.address ? (
                <>
                  <div className="button-wallet__icon">
                    {wallet.type === "metamask" ? (
                      <img src="./images/icon_metamask.svg" />
                    ) : wallet.type === "binance" ? (
                      <img src="./images/tokens/icon_token_bsc.svg" />
                    ) : wallet.type === "walletconnect" ? (
                      <img src="./images/icon_walletconnector.svg" />
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="button-wallet__text">
                    {`${String(wallet.address).substring(0, 4)}...${String(
                      wallet.address
                    ).substring(38)}`}
                  </span>
                  <div className="button-wallet__log-out">
                    <IconLogOut />
                  </div>
                </>
              ) : (
                <>
                  <span className="button-wallet__text">Connect Wallet</span>{" "}
                  <img
                    className="button-wallet__mobile-icon"
                    src="./images/icon_chain.svg"
                  />
                </>
              )}
            </button>
          </div>

          <div className="site-header__profile">
            {userObj ? (
              <div
                className={`button-wallet button-wallet_logged ${
                  dropdownActive ? "active" : ""
                }`}
                onClick={() => setDropdownActive(!dropdownActive)}
              >
                <div className="button-wallet__icon">
                  <img src="./images/icon_user.svg" />
                </div>
                <span className="button-wallet__text">
                  {userObj.displayName || userObj.email || "Profile"}
                </span>
                <img
                  className="button-wallet__arrow"
                  src="./images/arrow_dropdown.svg"
                />

                {!dropdownActive || (
                  <ul className="button-wallet__dropdown" ref={refs}>
                    <li className="button-wallet__dropdown-item">
                      <Link
                        to="/profile"
                        className="button-wallet__dropdown-link"
                      >
                        Account
                      </Link>
                    </li>
                    <li className="button-wallet__dropdown-item">
                      <button
                        className="button-wallet__dropdown-link button-wallet__dropdown-link_red"
                        onClick={() => logout()}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="site-header__btn button-wallet button-wallet_grey"
                >
                  <span className="button-wallet__text">Register</span>
                  <img
                    className="button-wallet__mobile-icon"
                    src="./images/icon_register.svg"
                  />
                </Link>
                <button
                  className="site-header__btn button-wallet button-wallet_green"
                  onClick={setModalLoginOpen}
                >
                  <span className="button-wallet__text">Log in</span>
                  <img
                    className="button-wallet__mobile-icon"
                    src="./images/icon_log-in.svg"
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {!walletError?.length || (
          <div className="error-dropdown">
            {[...new Set(walletError)].join("\n")}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
