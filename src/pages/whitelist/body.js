import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import { WalletContext } from "@src/context";
import useWindowSize from "@src/hooks/useWindowSize";

import { FormTasks } from "./components/form-tasks";
import { SOCIALS_INFO } from "./info";
import { Socials } from "../../components/socials/social";
import { SocialLink } from "../../components/socials/social-link";

export const Body = () => {
  const { wallet } = useContext(WalletContext);
  const { width } = useWindowSize();

  return (
    <div className="whitelist-container">
      <div className="whitelist-body">
        <div className="highstreet-body__head">
          <div className="highstreet-body__head-top">
            <div className="highstreet-body__head-title-container">
              <div className="highstreet-body__head-img-wrapper">
                <img
                  className="highstreet-body__head-img"
                  src="images/zam-pad/oracula-icon.svg"
                />
              </div>
              <div className="highstreet-body__head-title-content">
                <div className="highstreet-body__head-title">Oracula</div>
                <div className="highstreet-body__head-subtitle">
                  The Blockchain Prediction Markets Platform
                </div>
              </div>
            </div>
            <div className="highstreet-body__head-icons">
              <Socials>
                {SOCIALS_INFO.length && SOCIALS_INFO.map(({ href, imgUrl }, index) => (
                  <SocialLink
                    key={Math.random(index)}
                    href={href}
                    imgUrl={imgUrl}
                  />))}
              </Socials>
            </div>
          </div>
          <div className="highstreet-body__head-desc">
            DeFi Prediction Markets built with the usage of hard-coded smart
            contracts. Oracula operates on decentralized blockchain networks
            that are designed to function without third-party middlemen
          </div>
        </div>
        <div className="whitelist-body__caution">
          <img
            src="./images/whitelist/caution-img.png"
            className="whitelist-body__caution-icon"
          />
          <p className="whitelist-body__caution-text">
            Please note that citizens from the following countries are not
            allowed to participate in the IDO: United States of America, Canada,
            China, New Zealand, Cuba, North Korea, Timor-Leste, Cambodia, Laos,
            Tanzania, Serbia, Tunisia, Uganda, Mali, Pakistan, Afghanistan,
            Somalia, Zimbabwe, Congo, Malawi, Mozambique, Crimea, Kyrgyzstan,
            Uzbekistan, Turkmenistan, Burundi, South Sudan, Sudan (north), Sudan
            (Darfur), Guinea-Bissau, Kosovo, Iran, Iraq, Libya, Syria, Ethiopia,
            Yemen, Sri Lanka, Ukraine, Belarus, and Venezuela
          </p>
        </div>
        <div className="whitelist-body__card">
          <div className="whitelist-body__join">
            <div className="whitelist-body__title whitelist-body__title_main">
              Join the Whitelist ✌️
            </div>
            <div className="whitelist-body__subtitle">
              We are excited to launch our IDO on ZAMpad. For a chance to win a
              whitelist spot, please fill out the form below and perform all
              tasks accordingly. If you have any questions, please contact us!
              <br />
              <br />
              Good Luck! 🚀
            </div>
          </div>
          <div className="whitelist-body__twitter">
            <div className="whitelist-body__title">Connect Twitter</div>
            <button
              className="whitelist-body__twitter-button button"
              type="button"
            >
              <img
                className="whitelist-body__twitter-icon"
                src="./images/whitelist/twitter-img.png"
              />
              Connect Twitter
            </button>
          </div>
          <div className="whitelist-body__wallet">
            <div className="whitelist-body__wallet-title">Your Wallet</div>
            <div className="whitelist-body__wallet-connetion">
              <div className="whitelist-body__wallet-address">
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
                <span className="whitelist-body__wallet-text">
                  {width < 460
                    ? `${String(wallet.address).substring(0, 5)}...${String(
                        wallet.address
                      ).substring(40)}`
                    : width > 650
                    ? wallet.address
                    : `${String(wallet.address).substring(0, 5)}...${String(
                        wallet.address
                      ).substring(30)}`}
                </span>
                <button
                  className="whitelist-body__wallet-copy"
                  onClick={() => {
                    wallet.address &&
                      navigator.clipboard.writeText(wallet.address);
                  }}
                >
                  <img
                    className="whitelist-body__wallet-copy-icon"
                    src="./images/profile/copy-img.png"
                  />
                </button>
              </div>
              <div className="whitelist-body__wallet-status">
                {wallet.address ? "Connected" : "Disconnected"}
              </div>
            </div>
          </div>
          <FormTasks />
        </div>
      </div>
    </div>
  );
};
