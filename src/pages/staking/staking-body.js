import React, {useContext, useEffect, useState} from 'react';
import {SmallBlock} from './network-overview-small-block';
import {StakingZam} from './stake-zam';
import {StakingCalculator} from './staking-calculator';
import {StakedUnstaked} from './connected-wallet/stakedg-unstaked-card';
import {Rewards} from './connected-wallet/rewards-card';
import {SmallAreaChart} from "@src/components/charts/small-area-chart";
import {RateContext, StakingContext, WalletContext} from "@src/context";
import {GRAPH_URL} from "@src/config";
import {NETWORK_BSC} from "@src/constants";
import {
    extractGraphDataByNetwork,
    extractScalarDataByNetwork,
    fromWei, numberFormat,
    prepareGraphArray,
    timestampToString
} from "@src/utils";
import {TvlBlock} from "@src/pages/staking/tvl-small-block";

const query = `{
                stackersTotal: stackerCounts(where: {id: "singleton"}) {
                    id
                    totalStake
                    count
                }
                stackerDayCountsData: stackerDayCounts {
                  timestamp
                  totalCount
                }
            }`;
const apiUrl = GRAPH_URL[NETWORK_BSC];

export const StakingBody = () => {
    const {wallet} = useContext(WalletContext);
    const {totalRewards} = useContext(StakingContext);
    const {rate} = useContext(RateContext);
    const [calculatorActive, setCalculatorActive] = useState(); //show by default on mobile
    const [tvl, setTvl] = useState(0);
    const [nos, setNos] = useState([]);
    const [nosTotal, setNosTotal] = useState(0);

    useEffect(() => {
        const initCalculator = !wallet?.address
        setCalculatorActive(initCalculator)
    }, [wallet?.address]);

    useEffect(async () => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query})
        })
            .then(response => response.json())
            .then(response => {

                let stackersTotal = 0;
                let stackerDayCountsTotal = 0;
                response.data.stackersTotal?.forEach(
                    ({totalStake, count}) => {
                        stackersTotal = fromWei(totalStake)
                        stackerDayCountsTotal = count
                    }
                );
                setTvl(stackersTotal);
                setNosTotal(stackerDayCountsTotal);

                const stackerDayCountsData = {};
                response.data.stackerDayCountsData.forEach(
                    ({timestamp, totalCount}) => stackerDayCountsData[timestampToString(timestamp)] = totalCount
                );
                setNos(stackerDayCountsData);
            });
    }, [])

    return (
        <>
            <div className="network-overview-container">
                Network Overview
            </div>
            <div className="cards">
                <div className="card card-narrow flex staking__card-left">
                    <SmallBlock/>
                    <TvlBlock tvl={tvl}/>
                </div>
                <div className="card flex staking__card-right">
                    <div className="card-filled">
                        <SmallAreaChart height="100px" title="Number of Stakes" chartKey="amount"
                                        total={nosTotal}
                                        data={prepareGraphArray(nos, 'amount')}/>
                    </div>
                    <div className="card-filled">
                        <SmallAreaChart height="70px" title="Total Rewards" chartKey="uv"
                                        total={totalRewards} unit="ZAM" data={[]}
                                        additionalValue={`$${numberFormat(parseInt(totalRewards * rate))}`}/>
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
