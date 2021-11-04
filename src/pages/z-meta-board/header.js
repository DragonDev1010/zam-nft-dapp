import React from 'react';

export const Header = () => {

    return (
        <>
            <div className="z-meta-header-container">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="farming-container">
                        zMetaBoard
                    </p>
                    <div className="zam-values-container">
                        <div className="value-container">
                            <div style={{ color: "#2DFF82" }} className="zam-value">
                                8 000 000 ZAM
                            </div>
                            <div className="zam-value-title">
                                Total Liquidiy
                            </div>
                        </div>
                        <div className="value-container">
                            <div className="zam-value">
                                43 000 ZAM
                            </div>
                            <div className="zam-value-title">
                                Total Volume
                            </div>
                        </div>
                        <div className="value-container">
                            <div className="zam-value">
                                65 234 ZAM
                            </div>
                            <div className="zam-value-title">
                                Total Referrer Reward
                            </div>
                        </div>
                        <div className="value-container">
                            <div className="zam-value">
                                43 543 ZAM
                            </div>
                            <div className="zam-value-title">
                                Total Supply
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "2em" }} className="activity-buttons-container">
                        <button id="all" onClick={e => onClickButton(e)} className="activity-button">
                            <div className="activity-nutton-content">
                                All Networks
                            </div>
                        </button>
                        <button id="eth" onClick={e => onClickButton(e)} className="activity-button">
                            <div style={{ display: "flex" }} className="activity-nutton-content">
                                <div>
                                    <img className="button-icon" src="../../../images/eth.png" />
                                </div>
                                <div className="eth-button-content">
                                    ETH Network
                                </div>
                            </div>
                        </button>
                        <button id="bsc" onClick={e => onClickButton(e)} className="activity-button">
                            <div style={{ display: "flex" }} className="activity-nutton-content">
                                <div>
                                    <img className="button-icon" src="../../../images/bsc.png" />
                                </div>
                                <div className="eth-button-content">
                                    BSC Network
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};
