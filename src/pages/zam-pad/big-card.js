import React, { useState, useContext } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

export const BigCard = (props) => {
    return (
        <>
            <div className="big-card">
                <div className="big-card__icon-container">
                    <img className="big-card__icon-container__icon" src={props.headerImage} />
                </div>
                <div className="big-card__header">
                    <div className="big-card__header__ended">
                        <div>
                            Ended in:
                        </div>
                        <div>
                            1:23:15:17
                        </div>
                    </div>
                    <div>
                        <div className="big-card__header__title">
                            <img src="images/zam-pad/bsc.svg" />
                            <div style={{ marginLeft: "3%" }}>BSC</div>
                        </div>
                        <div className="big-card__header__bsc">
                            1 IME = 0.27 BNB
                        </div>
                    </div>
                </div>
                <div>
                    <img src={props.image} style={{ width: "100%" }} />
                </div>
                <div className="big-card__content">
                    <div className="big-card__content__header">
                        <div className="big-card__content__header__left">
                            <div>{props.title}</div>
                        </div>
                        <div className="big-card__content__header__badge">
                            <div className="big-card__content__header__badge__gamefi"><div>GameFi</div></div>
                            <div className="big-card__content__header__badge__sale"><div>Sale</div></div>
                        </div>
                    </div>
                    <div className="big-card__content__header__left__bottom">{props.description}</div>
                    <div className="big-card__total-raise">
                        <div className="big-card__total-raise__content">Total Raise:</div>
                        <div className="big-card__total-raise__usdt">
                            <img src={props.currency} />
                            <div style={{ marginLeft: "5px" }}>
                                {props.totalCapacity}
                            </div>
                        </div>
                    </div>
                    <div className="big-card__progress">
                        <ProgressBar height="97%" bgColor="#2DFF82" baseBgColor="#0E1017" completed={props.progress} customLabel=" " />
                    </div>
                    <div className="big-card__progress__metrics">
                        <div><span className="big-card__progress__metrics__currentPercent">{props.currentPercent}</span>{props.minPercent}</div>
                        <div>{props.piece}</div>
                    </div>
                    <div className="big-card__content__footer">
                        <div>
                            <div className="big-card__content__footer__title">Followers:</div>
                            <div className="big-card__content__footer__content">{props.followers}</div>
                        </div>
                        <div>
                            <div className="big-card__content__footer__title">Community Score:</div>
                            <div className="big-card__content__footer__content" style={{ color: "#2DFF82" }}>{props.score}</div>
                        </div>
                        <div>
                            <div className="big-card__content__footer__title">Access</div>
                            <div className="big-card__content__footer__content">{props.access}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};