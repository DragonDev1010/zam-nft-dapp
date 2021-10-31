import React from 'react';


export const CardComponent = (props) => {
    return (
        <>
            <div className="card-container">
                <div style={{ background: props.background }} className="card-header">
                    <div className="card-header-left-container">
                        <div className="card-header-container-content">
                            <p className="top-p-container">
                                Total Staked
                            </p>
                            <p className="bottom-p-container">
                                $54 243 789
                            </p>
                        </div>
                    </div>
                    <div className="card-header-center-container">
                        <div className="coins-container">
                            <img className="image-container" src={props.leftCoin} />
                            <img style={{marginLeft:"-1.2em"}} className="image-container" src={props.rightCoin} />
                        </div>
                        <div className="activity-container">
                            <div className="activity-container-title">
                                Active ✅
                            </div>
                        </div>
                    </div>
                    <div className="card-header-right-container">
                        <div className="card-header-container-content">
                            <p className="top-p-container">
                                Farming APY
                            </p>
                            <p className="bottom-p-container">
                                32,12%
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body-container">
                    <div className="title-container">
                        <p>Deposit ZAM-WBNB to earn</p>
                        <p>ZAM and WBNB</p>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <p className="content-left">Start date</p>
                            <p className="content-right">24 Sep 2021 9:00 UTC</p>
                        </div>
                        <div className="content">
                            <p className="content-left">End date</p>
                            <p className="content-right">24 Oct 2021 9:00 UTC</p>
                        </div>
                        <div style={{ marginTop: "1em" }} className="content">
                            <p className="content-left">Your Stake</p>
                            <p className="content-right">$0.00</p>
                        </div>
                        <div className="content">
                            <p className="content-left">ZAM Reward</p>
                            <p className="content-right">$0.00</p>
                        </div>
                        <div className="content">
                            <p className="content-left">LDO Reward</p>
                            <p className="content-right">$0.00</p>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="connect-wallet-button" >Connect Wallet</button>
                    </div>
                </div>
            </div>
        </>
    )
};