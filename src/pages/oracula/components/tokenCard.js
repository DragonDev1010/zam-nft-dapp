import React, { useContext } from "react";
import Countdown from "react-countdown";
import ProgressBar from "@ramonak/react-progress-bar";

import { WalletContext } from "@src/context";
import { STAGES } from "@src/constants";

import { Badge } from "@src/components/badge/badge";

import { Round } from "./roundInfo";
import { OraculaButton } from "./oraculaButton";

export const TokenCard = ({
  oraculaData,
  handleInitialData,
  setModalWalletOpen,
  rounds,
  handleJoin,
  roundOneHandler,
  buyRoundTwoHandler,
  round2Number,
}) => {
  const { wallet } = useContext(WalletContext);

  const progress =
    oraculaData.allocationSold / (Number(oraculaData.allocationTotal) / 100) ||
    0;

  const diffTime =
    Number(oraculaData.endTime) - Date.now() > 0
      ? Number(oraculaData.endTime) - Date.now()
      : 0;

  const OraculaCardButton = ({ stage }) => {
    if (!wallet.address)
      return (
        <OraculaButton
          onClick={() => setModalWalletOpen(true)}
          title="Connect Wallet"
        />
      );

    const { disabledButtonWhitelist, disabledButtonRoundOne } = oraculaData;

    switch (stage) {
      case 1:
        return disabledButtonWhitelist ? (
          <OraculaButton disable={true} title="You follow" />
        ) : (
          <OraculaButton onClick={handleJoin} title="Join WhiteList" />
        );
      case 2:
        return disabledButtonRoundOne ? (
          <OraculaButton disable={true} title="Your Round1 complete" />
        ) : (
          <OraculaButton
            disabled={oraculaData.paused}
            onClick={roundOneHandler}
            title="Buy allocation"
          />
        );
      case 3:
        return (
          <OraculaButton
            disabled={oraculaData.paused}
            onClick={() => buyRoundTwoHandler(round2Number)}
            title="Buy allocation"
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="token-card">
      <div className="token-card__content">
        <div className="token-card__info-block">
          <div className="token-card__info">
            <div className="token-card__info-header">
              <div className="token-card__info-bsc">
                <img
                  className="token-card__info-bsc-img"
                  src="images/zam-pad/bscc.svg"
                />
                <div className="token-card__info-bsc-text">BSC</div>
              </div>
              <div className="token-card__info-badges">
                <Badge modifier="badge_red" content="P2Earn" />
                <div className="token-card__info-stage">
                  {STAGES[oraculaData.stage]}
                </div>
              </div>
            </div>
            <div className="token-card__timer">
              <div className="token-card__timer-title">Sale Ends In:</div>
              <div className="token-card__timer-time">
                {diffTime ? (
                  <Countdown
                    onComplete={handleInitialData}
                    date={Date.now() + diffTime}
                  />
                ) : (
                  <span>00:00:00:00</span>
                )}
              </div>
            </div>
            <div className="token-card__progress">
              <div className="token-card__progress-title-wrapper ">
                <div className="token-card__progress-title">Total Raise</div>
                <div className="token-card__progress-title-currency">
                  <img
                    className="token-card__progress-title-img"
                    src="images/tokens/icon_token_usdt.svg"
                  />
                  <span> {`${oraculaData.allocationTotal} USDT`} </span>
                </div>
              </div>
              <div className="token-card__progress-bar">
                <ProgressBar
                  completed={progress}
                  bgColor="#2DFF82"
                  baseBgColor="#0E1017"
                  height="12px"
                  customLabel=" "
                />
              </div>
              <div className="token-card__stats">
                <div className="token-card__stats-procents">
                  {`${Number(progress).toFixed(2)}%`}
                </div>
                <div className="token-card__stats-participants">
                  {`${Number(oraculaData.allocationSold).toFixed(2)}/${
                    oraculaData.allocationTotal
                  }`}
                </div>
              </div>
            </div>
            <div className="token-card__community">
              <div className="token-card__community-item">
                <div className="token-card__community-title">
                  Community Score:
                </div>
                <div className="token-card__community-text">
                  👌 <span className="green-span">7.8/10</span>
                </div>
              </div>
              <div className="token-card__community-item ">
                <div className="token-card__community-title">Access</div>
                <div className="token-card__community-text">Private</div>
              </div>
            </div>
            <OraculaCardButton stage={oraculaData.stage} />
          </div>
        </div>
        <div className="token-card__rounds-block">
          <div className="token-card__rounds">
            <div className="token-card__rounds-title">IDO Process:</div>
            <div className="token-card__rounds-content">
              {rounds.length &&
                rounds.map(({ number, title, subtitle, status, isActive }) => (
                  <Round
                    key={Math.random(number)}
                    number={number}
                    title={title}
                    subtitle={subtitle}
                    status={status}
                    isActive={isActive}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
