import React from 'react';


export const StakingCalculator = () => {
    return (
        <>
            <div className="staking-calculator">
                <div className="staking-calculator-header">
                    <div>
                        Staking Calculator
                    </div>
                    <div className="staking-calculator-buttons-group">
                        <button id="bsc" style={{ marginTop: "1.2em" }} className="activity-button set-width">
                            <div style={{ display: "flex" }}>
                                <div className="eth-button-content bsc-button-content">
                                    Without NFT
                                </div>
                            </div>
                        </button>
                        <button id="bsc" style={{ marginTop: "1.2em" }} className="activity-button set-width">
                            <div style={{ display: "flex" }}>
                                <div className="eth-button-content bsc-button-content">
                                    With NFT
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="range-title">
                    <div>
                        <div className="range-title-header">
                            Your $ZAM Stake
                        </div>
                        <div className="range-title-body">
                            100
                        </div>
                    </div>
                    <div>
                        <div className="range-title-header">
                            Yearly Return
                        </div>
                        <div style={{ color: "#2DFF82" }} className="range-title-body">
                            +51.08%
                        </div>
                    </div>
                </div>
                <div className="stakinkg-calculator-footer">
                    <div className="calculator-footer-column">
                        <div className="period-container">
                            Daily
                        </div>
                        <div className="period-zam">
                            20.18 ZAM
                        </div>
                        <div className="period-zam-cost">
                            $14.49
                        </div>
                    </div>
                    <div className="calculator-footer-column">
                        <div className="period-container">
                            Monthly
                        </div>
                        <div className="period-zam">
                            605.4 ZAM
                        </div>
                        <div className="period-zam-cost">
                            $434.7
                        </div>
                    </div>
                    <div>
                        <div className="period-container">
                            Yearly
                        </div>
                        <div className="period-zam">
                            7 264.8 ZAM
                        </div>
                        <div className="period-zam-cost">
                            $5 216.4
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
