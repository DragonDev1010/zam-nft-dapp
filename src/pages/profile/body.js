import React, { useState, useContext, useEffect } from "react";
import TelegramLoginButton from "react-telegram-login";

import { OraculaAction } from "@src/actions/oraculaAction";
import { ModalContext, UserContext, WalletContext } from "@src/context";
import { NETWORKS } from "@src/constants";

import { PREJECTS_INFO, STATS_INFO } from "./info";
import { Project } from "./project-item";
import { StatsItem } from "./stats-item";
import WalletAdress from "../../components/wallet-adress";

import { getUserInfo, resetUserEmail, resetTelegram } from "../../api";
import { setUserLocal } from "@src/services/LocalStorageService";

export const ProfileBody = () => {
  const {
    setModalCheckEmailOpen,
    setModalChangePasswordOpen,
    setModalChangeDisplayNameOpen,
  } = useContext(ModalContext);
  const { wallet } = useContext(WalletContext);
  const { userObj, setUserObj } = useContext(UserContext);

  const action = new OraculaAction(wallet);
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("12345678");
  const [verifyWallet, setVerifyWallet] = useState("");
  const [userWallet, setUserWallet] = useState({
    balance: 0,
    name: "",
    icon: "",
  });

  useEffect(async () => {
    const walletBalance = await action.getWalletBalance(wallet);
    const chainId = await action.getChainId(wallet);
    const network = Object.keys(NETWORKS).find((key) =>
      NETWORKS[key].chainId.includes(chainId)
    );

    setUserWallet({
      balance: walletBalance,
      name: NETWORKS[network].name,
      icon: NETWORKS[network].icon,
    });
  }, [wallet]);

  const handleTelegramResponse = async (response) => {
    await resetTelegram(response.username);
  };

  useEffect(async () => {
    setIsLoading(true);
    getUserInfo()
      .then((response) => {
        setIsLoading(false);
        setUserObj(response.data);
        setEmail(response.data.email);
        setUserLocal({
          displayName: response.data.displayName,
          email: response.data.email,
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  const resetEmail = async (data) => {
    if (email !== data) {
      resetUserEmail(data).then((response) => {
        setModalCheckEmailOpen(true);
      });
    } else {
      console.log("Same email");
    }
  };

  return (
    <div className="profile-body">
      <div className="profile-body__cards">
        <div className="profile-body__card profile-body__card_wallet">
          <div className="profile-card">
            <div className="profile-card__title">
              <img
                className="profile-card__title-icon"
                src="./images/profile/wallet-img.png"
              />
              <span className="profile-card__title-text">Wallet Info</span>
            </div>
            <div className="profile-card__wallet">
              <WalletAdress />
              <div className="profile-card__data">
                <div className="profile-card__data-content">
                  <div className="profile-card__data-item">
                    <div className="profile-card__data-title">Balance:</div>
                    <div className="profile-card__data-value">
                      {userWallet.balance
                        ? `${userWallet.balance} BNB`
                        : "Loading..."}
                    </div>
                    {/* <div className="profile-card__data-usd">$469.56</div> */}
                  </div>
                  <div className="profile-card__data-item">
                    <div className="profile-card__data-title">Network:</div>
                    {wallet.address && (
                      <div className="profile-card__data-value">
                        {userWallet.icon && (
                          <img
                            src={userWallet.icon}
                            alt="BSC"
                            className="profile-card__data-icon"
                          />
                        )}
                        {userWallet.name}
                      </div>
                    )}
                  </div>
                  {/* <div className="profile-card__data-item">
                    <div className="profile-card__data-title">Verification:</div>
                    {wallet.address && 
                      <>
                        {!verifyWallet ? 
                          <button 
                            className="small-btn profile-card__data-btn"
                            onClick={() => setVerifyWallet(true)}
                          >
                            Verify Wallet
                          </button>
                          : <div className="profile-card__data-value"><span className="green-span">Verified</span></div>
                        }
                      </>
                    }
                  </div> */}
                </div>
              </div>
            </div>
            <div className="profile-card__transaction disable">
              <div className="profile-card__transaction-btn">
                <img
                  className="profile-card__transaction-icon"
                  src="./images/profile/transaction-img.png"
                />
                <span className="profile-card__transaction-text">
                  Transaction History
                </span>
              </div>
              <div className="profile-card__transaction-btn">
                <img
                  className="profile-card__transaction-icon"
                  src="./images/profile/Bscscan.png"
                />
                <a className="profile-card__transaction-text" href="#">
                  Bscscan
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body__card profile-body__card_stats profile-body__card_soon">
          <div className="profile-card">
            <div className="profile-card__title">
              <img
                className="profile-card__title-icon"
                src="./images/profile/stats.png"
              />
              <span className="profile-card__title-text">Profile Stats</span>
              <span className="profile-card__title-soon">Soon</span>
            </div>
            <div className="profile-card__stats">
              {STATS_INFO.map((item, index) => (
                <StatsItem {...item} key={Math.random(index)} />
              ))}
            </div>
          </div>
        </div>

        <div className="profile-body__card">
          <div className="profile-card">
            <div className="profile-card__title">
              <img
                className="profile-card__title-icon"
                src="./images/profile/settings.png"
              />
              <span className="profile-card__title-text">Account Settings</span>
            </div>
            <div className="profile-card__inputs">
              <div className="profile-card__input">
                <label className="input-field__label">Email</label>
                <div className="input-field mt-10">
                  <div className="input-field__column input-field__column_wauto buttons-switcher">
                    <input
                      className="input-field__input"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email"
                    />
                  </div>
                  <div className="input-field__column input-field__column_wauto text-right">
                    <button
                      className={
                        email
                          ? "input-field__button"
                          : "input-field__button disabled"
                      }
                      disabled={!email}
                      onClick={() => resetEmail(email)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="profile-card__input">
                <label className="input-field__label">Password</label>
                <div className="input-field mt-10">
                  <div className="input-field__column input-field__column_wauto buttons-switcher">
                    <input
                      className="input-field__input"
                      value={password}
                      placeholder="Password"
                      type="password"
                      disabled
                    />
                  </div>
                  <div className="input-field__column input-field__column_wauto text-right">
                    <button
                      className="input-field__button"
                      onClick={() => setModalChangePasswordOpen(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="profile-card__input">
                <label className="input-field__label">Display Name </label>
                <div className="input-field mt-10">
                  <div className="input-field__column input-field__column_wauto buttons-switcher">
                    <input
                      className="input-field__input"
                      value={userObj?.displayName}
                      placeholder="Display Name"
                      disabled
                    />
                  </div>
                  <div className="input-field__column input-field__column_wauto text-right">
                    <button
                      className="input-field__button"
                      onClick={() => setModalChangeDisplayNameOpen(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-card__scl-btns">
              <div className="profile-card__scl-btn-wrapper">
                <div className="profile-card__scl-btn-title">Telegram</div>
                {userObj?.telegram ? (
                  <div className="profile-btn telegram">
                    <img src="./images/profile/telegram-btn.png" />
                    <span>@{userObj?.telegram}</span>
                  </div>
                ) : (
                  <TelegramLoginButton
                    dataOnauth={handleTelegramResponse}
                    lang="ru"
                    botName={process.env.BOT_TELEGRAM}
                  />
                )}
              </div>
              <div className="profile-card__scl-btn-wrapper">
                <div className="profile-card__scl-btn-title">Twitter</div>
                <button className="profile-btn twitter disabled">
                  <img src="./images/profile/twitter-btn.png" />
                  <span>Connect Twitter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body__card">
          <div className="profile-card">
            <div className="profile-card__title">
              <img
                className="profile-card__title-icon"
                src="./images/profile/projects.png"
              />
              <span className="profile-card__title-text">
                Followed Projects
              </span>
            </div>
            <div className="profile-card__projects custom-scroll">
              {PREJECTS_INFO.map((item, index) => (
                <Project {...item} key={Math.random(index)} />
              ))}
            </div>
          </div>
        </div>
        <div className="profile-body__card">
          <div className="profile-card">
            <div className="profile-card__title">
              <img
                className="profile-card__title-icon"
                src="./images/profile/profile.png"
              />
              <span className="profile-card__title-text">Profile Rank</span>
            </div>
            <div className="profile-card__level">
              <div className="profile-card__level-title">
                2 lvl
                <span className="profile-card__level-color">Yelow Belt</span>
              </div>
              <div className="profile-card__level-count">1 NFT </div>
            </div>
            <div className="profile-card__info">
              <div className="profile-card__info-item">
                <div className="profile-card__info-key">Staked ZAM:</div>
                <div className="profile-card__info-value">
                  24,654.635199 ZAM
                </div>
              </div>
              <div className="profile-card__info-item">
                <div className="profile-card__info-key">Alloc. Type:</div>
                <div className="profile-card__info-value">Guaranteed x1.8</div>
              </div>
              <div className="profile-card__info-item">
                <div className="profile-card__info-key">Alloc. Size:</div>
                <div className="profile-card__info-value">Up to $450</div>
              </div>
              <div className="profile-card__info-item">
                <div className="profile-card__info-key">
                  Private & Seed Pools:
                </div>
                <div className="profile-card__info-value">Private Pools</div>
              </div>
              <div className="profile-card__info-item profile-card__info-item_last">
                <div className="profile-card__info-key">
                  🔥 To level Up Stake
                </div>
                <div className="profile-card__info-value">
                  <span className="green-span">5,346.6394 ZAM</span>
                </div>
              </div>
            </div>
            <button className="profile-card__button button">Get 3 level</button>
          </div>
        </div>
      </div>
    </div>
  );
};
