import React, { useContext, useRef } from "react";
import "swiper/css";
import { ModalContext, WalletContext } from "@src/context";
import { Button } from "@src/components/buttons/button";

export const Body = () => {
  const { setModalWalletOpen } = useContext(ModalContext);
  const { wallet } = useContext(WalletContext);

  const btnHandler = () => {
    if (!wallet.address) {
      setModalWalletOpen(true);
    } else console.log("wallet is connected");
  };

  return (
    <div className="whitelist-container">
      <div className="whitelist-body">
        <div className="whitelist-body__title-container">
          <div className="whitelist-body__title-container__image">
            <img src="images/zam-pad/hightstreet-container-title.svg" />
          </div>
          <>
            <div className="whitelist-body__title-container__highstreet">
              <div className="whitelist-body__title-container__highstreet__title">
                <div className="whitelist-body__title-container__highstreet__title__h">Highstreet</div>
                <br />
                <div className="whitelist-body__title-container__highstreet__title__desc">
                  First Cross-Platform VR Metaverse on Solana
                </div>
              </div>
              <div className="whitelist-body__title-container__highstreet__title__icons">
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/discord.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/m.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/m2.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/gecko.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/homes.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/ethernet.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img style={{ marginTop: "2.5%" }} src="images/zam-pad/twit.svg" />
                </a>
                <a href="https://google.com">
                  <img
                    className="whitelist-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/teleg.svg"
                  />
                </a>
                <div>
                  <button
                    style={{ margin: "1%" }}
                    className="whitelist-body__title-container__highstreet__title__icons__button"
                  >
                    <img src="images/zam-pad/info.svg" />
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="whitelist-body__title-container__desc">
              Solice elevates the metaverse experience to the next dimension by providing top-quality infrastructure,
              immersiveness, and life- <br />
              like visualizations
            </div>
          </>
        </div>
        <div className="whitelist-body__caution">
          <img src="/images/whitelist/caution-img.png" />
          <p>
            Please note that citizens from the following countries are not allowed to participate in the IDO: United States
            of America, Canada, China, New Zealand, Cuba, North Korea, Timor-Leste, Cambodia, Laos, Tanzania, Serbia,
            Tunisia, Uganda, Mali, Pakistan, Afghanistan, Somalia, Zimbabwe, Congo, Malawi, Mozambique, Crimea, Kyrgyzstan,
            Uzbekistan, Turkmenistan, Burundi, South Sudan, Sudan (north), Sudan (Darfur), Guinea-Bissau, Kosovo, Iran, Iraq,
            Libya, Syria, Ethiopia, Yemen, Sri Lanka, Ukraine, Belarus, and Venezuela
          </p>
        </div>
        <div className="whitelist-body__card">
          <div className="whitelist-body__card__join">
            <div className="whitelist-body__card__join__title">Join the Whitelist ✌️</div>
            <div className="whitelist-body__card__join__subtitle">
              We are excited to launch our IDO on ZAMpad. For a chance to win a whitelist spot, please fill out the form
              below and perform all tasks accordingly. If you have any questions, please contact us! Good Luck! 🚀
            </div>
          </div>
          <div className="whitelist-body__card__twitter">
            <div className="whitelist-body__card__twitter__title">Connect Twitter</div>
            <button className="whitelist-body__card__twitter__button">
              {" "}
              <img src="/images/whitelist/twitter-img.png" /> Connect Twitter
            </button>
          </div>
          <div className="whitelist-body__card__wallet">
            <div className="whitelist-body__card__wallet__title">Your Wallet</div>
            <div className="whitelist-body__card__wallet__connetion">
              <div className="whitelist-body__card__wallet__connetion__address">
                <div className="whitelist-body__card__wallet__connetion__address__icon">
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
                <p>{wallet?.address}</p>
                <img src="/images/whitelist/copy-img.png" />
              </div>
              <div className="whitelist-body__card__wallet__connetion__status">Connected</div>
            </div>
          </div>
          <div className="whitelist-body__card__input-wrapper">
            <div className="whitelist-body__card__input-wrapper__title">Your Twitter</div>
            <div className="whitelist-body__card__input-wrapper__input">
              <div className="input-field mt-10">
                <input className="input-field__input" placeholder="Enter your Twitter" />
              </div>
            </div>
          </div>
          <div className="whitelist-body__card__input-wrapper">
            <div className="whitelist-body__card__input-wrapper__title">Your Telegram</div>
            <div className="whitelist-body__card__input-wrapper__input">
              <div className="input-field mt-10">
                <input className="input-field__input" placeholder="Enter your Telegram" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
