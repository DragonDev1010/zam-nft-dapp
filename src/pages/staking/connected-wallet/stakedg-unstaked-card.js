import React, {useContext} from 'react';
import {numberFormat, toFixed} from "@src/utils";
import {StakingContext} from "@src/context";


export const StakedUnstaked = () => {
    const {staked, balance, apy} = useContext(StakingContext);

    const stakeRewardDay = (staked * (1 + apy / 100) - staked) / 365;

    return (
        <div className="card card-narrow card-filled">
            <div className="stake-unstake-body">
                <div className="flex flex-column">
                    <span className="stake-zam-container-header">Staked</span>

                    <div className="stake-unstake-body-card">
                        <div>
                            <img src="/images/zam.svg"/>
                        </div>
                        <div className="stake-unstake-body-card-value">
                            {numberFormat(toFixed(staked, 2))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-column">
                    <span className="stake-zam-container-header">Unstaked</span>

                    <div className="stake-unstake-body-card">
                        <div>
                            <img src="/images/zam.svg"/>
                        </div>
                        <div className="stake-unstake-body-card-value">
                            {numberFormat(toFixed(balance, 2))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="stake-unstake-footer-card">
                <div className="stake-unstake-footer-card-title">
                    Your Average Rewards per day
                </div>
                <div className="stake-unstake-footer-card-value">
                    ≈{numberFormat(toFixed(stakeRewardDay, 2))} ZAM
                </div>
            </div>
        </div>
    )
};
