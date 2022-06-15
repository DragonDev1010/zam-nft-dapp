import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from 'react-router-dom';
import { STAGES } from "@src/constants";
import { Badge } from '../../../components/badge/badge';

export const BigCard = ({ headerImage, image, title, stage, description, currency, allocationTotal, progress, allocationSold, currentPercent, minPercent, access, endDate, tokenName, tokenPrice, href }) => {
    return (
        <Link to={href} className="big-card">
            <div className="big-card__wrapper">
                <div className="big-card__icon-container">
                    <img className="big-card__icon" src={headerImage} />
                </div>
                <div className="big-card__header">
                    <div className="big-card__ended">
                        <div className="big-card__ended-title">
                            Ended in:
                        </div>
                        <div className="big-card__ended-time">
                            {endDate}
                        </div>
                    </div>
                    <div className='big-card__header-right'>
                        <div className='big-card__platforms'>
                            <div className="big-card__platform">
                                <img className="big-card__platform-icon" src="images/zam-pad/bsc.svg" />
                                <div className="big-card__platform-text">BSC</div>
                            </div>
                        </div>
                        <div className="big-card__price">
                            <b>1 {tokenName}</b> = ${tokenPrice}
                        </div>
                    </div>
                </div>
                <div className="big-card__img-wrapper">
                    <div className="big-card__img-link"> 
                        <img className="big-card__img" src={image} />
                    </div>
                </div>
                <div className="big-card__content">
                    <div className="big-card__content-header">
                        <div className="big-card__title">
                            {title}
                        </div>
                        <div className="big-card__badges">
                            <Badge modifier="badge_red" content="P2Earn" />
                            {stage ? <div className="big-card__stage">{stage}</div> : false}
                        </div>
                    </div>
                    <div className="big-card__description">{description}</div>
                    <div className="big-card__total-raise">
                        <div className="big-card__total-raise-text">Total Raise:</div>
                        <div className="big-card__total-raise-usdt">
                            <img className="big-card__total-raise-icon" src={currency} />
                            <div className="big-card__total-raise-count">
                                {`$${allocationTotal} USDT`}
                            </div>
                        </div>
                    </div>
                    <div className="big-card__progress">
                        <ProgressBar height="12px" bgColor="#2DFF82" baseBgColor="#0E1017" completed={progress} customLabel=" " />
                    </div>
                    <div className="big-card__progress-metrics">
                        <div><span className="big-card__currentPercent">{currentPercent}</span>{minPercent}</div>
                        <div>{`${Number(allocationSold).toFixed(2)}/${allocationTotal}`}</div>
                    </div>
                    <div className="big-card__footer">
                        <div className="big-card__footer-item">
                            <div className="big-card__footer-stage">{stage}</div>
                            {/* Для зеленого цвета модификатор - big-card__footer-stage_green */}
                        </div>
                        <div className="big-card__footer-item">
                            <div className="big-card__footer-title">Access</div>
                            <div className="big-card__footer-content">{access}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
};