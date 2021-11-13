import React from 'react';
import { SmallBlock } from './network-overview-small-block';
import { TvrBlock } from "./tvr-small-block"
import { SmallAreaChartBlock } from "./small-area-chart-block"
import { swapChart, data } from '../z-meta-board/chart-arrays';
import { StakingZam } from './stake-zam';
import { StakingCalculator } from './staking-calculator';
import { StakeZam } from './connected-wallet/stake-zam';
import { StakedUnstaked } from './connected-wallet/stakedg-unstaked-card';
import { Rewards } from './connected-wallet/rewards-card';
export const StakingBody = () => {
    return (
        <>
            <div className="body-container">
                <div className="network-overview-container">
                    Network Overview
                </div>
                <div className="small-blocks">
                    <SmallBlock />
                    <TvrBlock />
                    <SmallAreaChartBlock height="100px" chartWidth="270px" title="Number of Stakes" rate="13 543" data={data} />
                    <SmallAreaChartBlock height="100px" titleFooter="12 202 124 USD" chartWidth="220px" title="Total Staked" rate="141 363 885 ZAM" data={swapChart} />
                </div>
                <div className="network-overview-container">
                    My Stake
                </div>
                <div className="body-container-staking-zam">
                    <StakingZam />
                    <StakingCalculator />
                </div>
                <div className="network-overview-container">
                    My Stake
                </div>
                <div className="body-container-staking-zam">
                    <StakeZam />
                    <StakedUnstaked/>
                    <Rewards/>
                </div>
            </div>
        </ >
    )
};
