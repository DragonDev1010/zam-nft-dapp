import React from 'react';
import Countdown from "react-countdown";
import { Link } from 'react-router-dom';

import { Badge } from '@src/components/badge/badge';

export const DetailedCard = ({ title, description, total, followers, score, access, image, headerImage, stage, time, onStopTimer, href }) => (
  <Link to={href} className="detailed-card">
    <div className="detailed-card__img-block">
      <img className="detailed-card__img" src={image} />
      <img className="detailed-card__img-icon" src={headerImage} />
    </div>
    <div className="detailed-card__content-block">
      <div className="detailed-card__content">
        <div className="detailed-card__head">
          <div className="detailed-card__bsc">
            <img className="detailed-card__bsc-img" src="images/zam-pad/bsc.svg" />
            <p className="detailed-card__bsc-text">BSC</p>
          </div>
          <div className="detailed-card__badges">
            <Badge modifier="badge_red" content="P2Earn" />
            { stage ? <div className="detailed-card__badges-soon">{stage}</div> : false}
          </div>
        </div>
        <div className="detailed-card__text">
          <div className="detailed-card__title">
            {title}
          </div>
          <div className="detailed-card__description">
            {description}
          </div>
        </div>
        <div className="detailed-card__info">
          <div className="detailed-card__timer">
            <div className="detailed-card__timer-title">
              IDO Strarts In:
            </div>
            <div className="detailed-card__timer-content">
              {time ? <Countdown onStop={onStopTimer} date={Date.now() + time} /> : <>00:00:00:00</>}
            </div>
          </div>
          <div className="detailed-card__raise">
            <div className="detailed-card__raise-title">
              Total Raise
            </div>
            <div className="detailed-card__raise-content">
              <img className="detailed-card__raise-icon" src="images/zam-pad/usd.svg" />
              <div className="detailed-card__raise-text">
                {total} USDT
              </div>
            </div>
          </div>
        </div>
        <div className="detailed-card__footer">
          <div className="detailed-card__footer-item">
            <div className="detailed-card__footer-title">
              Followers:
            </div>
            <div className="detailed-card__footer-content">
              {followers}
            </div>
          </div>
          <div className="detailed-card__footer-item">
            <div className="detailed-card__footer-title">
              Community Score:
            </div>
            <div className="detailed-card__footer-content detailed-card__footer-content_green">
              {score}
            </div>
          </div>
          <div className="detailed-card__footer-item">
            <div className="detailed-card__footer-title">
              Access
            </div>
            <div className="detailed-card__footer-content">
              {access}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
)