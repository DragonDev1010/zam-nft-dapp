import React from 'react';
import { useState } from 'react';


export const StakedUnstaked = () => {

    return (
        <>
            <div className="stake-zam-container">
                <div className="stake-zam-container-header">
                    <div>
                        Staked
                    </div>
                    <div>
                        Unstaked
                    </div>
                </div>
                <div className="stake-unstake-body">
                    <div className="stake-unstake-body-card">
                        <div>
                            <img src="../../../../images/zam.svg" />
                        </div>
                        <div className="stake-unstake-body-card-value">
                            23 424.65
                        </div>
                    </div>
                    <div className="stake-unstake-body-card">
                        <div>
                            <img src="../../../../images/zam.svg" />
                        </div>
                        <div className="stake-unstake-body-card-value">
                            624 880.65
                        </div>

                    </div>
                </div>
                <div className="stake-unstake-footer-card">
                    <div className="stake-unstake-footer-card-title">
                        Your Average Rewards per day
                    </div>
                    <div className="stake-unstake-footer-card-value">
                        ≈23.53165 ZAM
                    </div>

                </div>
            </div>
        </>
    )
};
