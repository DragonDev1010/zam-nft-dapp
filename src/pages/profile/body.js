import { WalletContext } from "@src/context";
import React, { useContext, useState, useEffect } from "react";
import { PREJECTS_INFO, STATS_INFO } from "./info";
import { Project } from "./project-item";
import { StatsItem } from "./stats-item";

export const ProfileBody = () => {
  const { wallet } = useContext(WalletContext);

  return (
    <div className="profile-body">
      <div className="profile-body__top-cards">
        <div className="profile-body__top-cards__wallet">
          <div className="profile-body__top-cards__wallet__title">
            <img src="/images/profile/wallet-img.png" />
            <span>Wallet Info</span>
          </div>
          <div className="profile-body__top-cards__wallet__info">
            <div className="profile-body__top-cards__wallet__info__address">
              <div className="profile-body__top-cards__wallet__info__address__title">
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
                <span>{wallet.address}</span>
                <img src="/images/profile/copy-img.png" />
              </div>
              <div className="profile-body__top-cards__wallet__info__address__disconnect">
                <img src="/images/profile/disconnect-img.png" />
                <span>Disconnect</span>
              </div>
            </div>
            <div className="profile-body__top-cards__wallet__info__data">
              <div className="profile-body__top-cards__wallet__info__data__item">
                <div className="profile-body__top-cards__wallet__info__data__item__title">Balance:</div>
                <div className="profile-body__top-cards__wallet__info__data__item__value">0.03494632 BNB</div>
                <div className="profile-body__top-cards__wallet__info__data__item__usd">$469.56</div>
              </div>
              <div className="profile-body__top-cards__wallet__info__data__item">
                <div className="profile-body__top-cards__wallet__info__data__item__title">Staked ZAM:</div>
                <div className="profile-body__top-cards__wallet__info__data__item__value">24,654.635199 ZAM</div>
                <div className="profile-body__top-cards__wallet__info__data__item__usd">$1,383.69</div>
              </div>
              <div className="profile-body__top-cards__wallet__info__data__item">
                <div className="profile-body__top-cards__wallet__info__data__item__title">Network:</div>
                <div className="profile-body__top-cards__wallet__info__data__item__value">24,654.635199 ZAM</div>
              </div>
            </div>
          </div>
          <div className="profile-body__top-cards__wallet__transaction">
            <div className="profile-body__top-cards__wallet__transaction__history">
              <img src="/images/profile/transaction-img.png" /> <span>Transaction History</span>
            </div>
            <div className="profile-body__top-cards__wallet__transaction__scan">
              <img src="/images/profile/Bscscan.png" /> <a href="#">Bscscan</a>
            </div>
          </div>
        </div>
        <div className="profile-body__top-cards__stats">
          <div className="profile-body__top-cards__stats__title">
            <img src="/images/profile/stats.png" /> Profile Stats
          </div>
          <div className="profile-body__top-cards__stats__items">
            {STATS_INFO.map((item) => (
              <StatsItem {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="profile-body__bottom-cards">
        <div className="profile-body__bottom-cards__card">
          <div className="profile-body__bottom-cards__card__title">
            <img src="/images/profile/settings.png" /> Account Settings
          </div>
          <div className="profile-body__bottom-cards__card__input">
            <label className="input-field__label">Email</label>
            <div className="input-field mt-10">
              <div className="input-field__column buttons-switcher">
                <input
                  className="input-field__input"
                  //    onChange={(e) => setDeadline(int(e.target.value))}
                  //    value={deadline || ''}
                  placeholder="Email"
                />
              </div>
              <div className="input-field__column text-right">
                <button>Edit</button>
              </div>
            </div>
          </div>
          <div className="profile-body__bottom-cards__card__input">
            <label className="input-field__label">Password</label>
            <div className="input-field mt-10">
              <div className="input-field__column buttons-switcher">
                <input
                  className="input-field__input"
                  //    onChange={(e) => setDeadline(int(e.target.value))}
                  //    value={deadline || ''}
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div className="input-field__column text-right">
                <button>Edit</button>
              </div>
            </div>
          </div>
          <div className="profile-body__bottom-cards__card__input">
            <label className="input-field__label">Display Name </label>
            <div className="input-field mt-10">
              <div className="input-field__column buttons-switcher">
                <input
                  className="input-field__input"
                  //    onChange={(e) => setDeadline(int(e.target.value))}
                  //    value={deadline || ''}
                  placeholder="Display Name "
                />
              </div>
              <div className="input-field__column text-right">
                <button>Edit</button>
              </div>
            </div>
          </div>
          <div className="profile-body__bottom-cards__card__btn-wrapper">
            <div className="profile-body__bottom-cards__card__btn-wrapper__title">Telegram</div>
            <button className="profile-btn telegram">
              {" "}
              <img src="/images/profile/telegram-btn.png" /> <span>Connect Telegram</span>
            </button>
          </div>
          <div className="profile-body__bottom-cards__card__btn-wrapper">
            <div className="profile-body__bottom-cards__card__btn-wrapper__title">Twitter</div>
            <button className="profile-btn twitter">
              {" "}
              <img src="/images/profile/twitter-btn.png" /> <span>Connect Twitter</span>
            </button>
          </div>
        </div>
        <div className="profile-body__bottom-cards__card">
          <div className="profile-body__bottom-cards__card__title">
            <img src="/images/profile/settings.png" /> Followed Projects
          </div>
          <div className="profile-body__bottom-cards__card__projects">
            {PREJECTS_INFO.map((item) => (
              <Project {...item} />
            ))}
          </div>
        </div>
        <div className="profile-body__bottom-cards__card">
          <div className="profile-body__bottom-cards__card__title">
            <img src="/images/profile/profile.png" /> Profile Rank
          </div>
          <div className="profile-body__bottom-cards__card__level">
            <div className="profile-body__bottom-cards__card__level__title">
              2 lvl <span>Yelow Belt</span>{" "}
            </div>
            <div className="profile-body__bottom-cards__card__level__count">1 NFT </div>
          </div>
          <div className="profile-body__bottom-cards__card__belt-info">
            <div className="profile-body__bottom-cards__card__belt-info__item">
              <div className="profile-body__bottom-cards__card__belt-info__item__key">Staked ZAM:</div>
              <div className="profile-body__bottom-cards__card__belt-info__item__value">24,654.635199 ZAM</div>
            </div>
            <div className="profile-body__bottom-cards__card__belt-info__item">
              <div className="profile-body__bottom-cards__card__belt-info__item__key">Alloc. Type:</div>
              <div className="profile-body__bottom-cards__card__belt-info__item__value">Guaranteed x1.8</div>
            </div>
            <div className="profile-body__bottom-cards__card__belt-info__item">
              <div className="profile-body__bottom-cards__card__belt-info__item__key">Alloc. Size:</div>
              <div className="profile-body__bottom-cards__card__belt-info__item__value">Up to $450</div>
            </div>
            <div className="profile-body__bottom-cards__card__belt-info__item">
              <div className="profile-body__bottom-cards__card__belt-info__item__key">Private & Seed Pools:</div>
              <div className="profile-body__bottom-cards__card__belt-info__item__value">Private Pools</div>
            </div>
            <div className="profile-body__bottom-cards__card__belt-info__line"></div>
            <div className="profile-body__bottom-cards__card__belt-info__item">
              <div className="profile-body__bottom-cards__card__belt-info__item__key">🔥 To level Up Stake </div>
              <div className="profile-body__bottom-cards__card__belt-info__item__value green">5,346.6394 ZAM</div>
            </div>
            <button>Get 3 level</button>
          </div>
        </div>
      </div>
    </div>
  );
};
