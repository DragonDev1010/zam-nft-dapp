import React from 'react';
import {NETWORK_BSC, NETWORK_ETH, NETWORKS} from "@src/constants";


export const StakingCalculator = () => {
    return (
        <>
            <div className="staking-calculator">
                <div className="staking-calculator-header">
                    <div>
                        Staking Calculator
                    </div>

                    <div className="button-outlines staking-calculator-buttons-group">
                        <button className={`button-outline current`}>
                            Without NFT
                        </button>
                        <button className={`button-outline`}>
                            With NFT
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
