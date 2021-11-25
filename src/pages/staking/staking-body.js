import React, {useContext, useState} from 'react';
import {SmallBlock} from './network-overview-small-block';
import {TvrBlock} from "./tvr-small-block"
import {swapChart, data} from '../z-meta-board/chart-arrays';
import {StakingZam} from './stake-zam';
import {StakingCalculator} from './staking-calculator';
import {StakedUnstaked} from './connected-wallet/stakedg-unstaked-card';
import {Rewards} from './connected-wallet/rewards-card';
import {SmallAreaChart} from "@src/components/charts/small-area-chart";
import {WalletContext} from "@src/context";

export const StakingBody = () => {
    const {wallet, walletError, setWalletError} = useContext(WalletContext);
    const [calculatorActive, setCalculatorActive] = useState(window.screen.width <= 768 && !wallet?.address); //show by default on mobile

    return (
        <>
            <div className="network-overview-container">
                Network Overview
            </div>
            <div className="cards">
                <div className="card card-narrow flex staking__card-left">
                    <SmallBlock/>
                    <TvrBlock/>
                </div>
                <div className="card flex staking__card-right">
                    <div className="card-filled">
                        <SmallAreaChart height="70px" title="Number of Stakes" chartKey="uv"
                                        total="TBA" data={[]}/>
                    </div>
                    <div className="card-filled">
                        <SmallAreaChart height="70px" title="Total Rewards" chartKey="uv"
                                        total="TBA" data={[]}/>
                    </div>
                </div>
            </div>

            <div className="network-overview-container">
                My Stake
            </div>

            <div className="cards">
                <div className="card card-filled card-narrow flex flex-column">
                    <StakingZam setCalculatorActive={() => setCalculatorActive(!calculatorActive)}/>
                </div>
                {
                    calculatorActive
                        ?
                        <div className="card card-filled staking-calculator">
                            <StakingCalculator/>
                        </div>
                        :
                        wallet?.address
                            ?
                            <>
                                <StakedUnstaked/>
                                <Rewards/>
                            </>
                            : ''

                }

            </div>
        </ >
    )
};
