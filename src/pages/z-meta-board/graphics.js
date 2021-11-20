import React, {useContext, useEffect, useState} from 'react';
import {data, totalSupply, barData} from './chart-arrays';
import {SmallAreaChart} from "../z-meta-board/small-area-chart"
import {CustomBarChart} from './bar-chart';
import {LargeAreaChart} from './large-custom-area-chart';
import {ZMetaBoardContext} from "@src/context/zmetaboard-context";
import {extractGraphDataByNetwork, extractScalarDataByNetwork, numberFormat} from "@src/utils";
import {NETWORK_ETH, TOTAL_SUPPLY} from "@src/constants";
import {getMarketData} from "@src/api";
import {RateContext} from "@src/context";

export const Graphics = () => {
    const {chartData, network} = useContext(ZMetaBoardContext);
    const [marketData, setMarketData] = useState({});
    const [marketDataTotal, setMarketDataTotal] = useState({});
    const {rate} = useContext(RateContext);
    const [transferZamTotal, setTransferZamTotal] = useState(0);
    const [transferZamData, setTransferZamData] = useState([]);

    const totalSupply = !network ? TOTAL_SUPPLY : extractScalarDataByNetwork(chartData, 'totalSupplies', network);

    useEffect(() => {
        getMarketData(setMarketData, setMarketDataTotal);
    }, [])

    useEffect(() => {
        const transferZamTotal = parseInt(extractScalarDataByNetwork(chartData, 'transferZamTotal', network) * rate);
        const transferZamData = extractGraphDataByNetwork(chartData, 'transferZamData', 'USD', network)
            .map(item => {
                item['USD'] = parseInt(item['USD'] * rate);
                return item;
            });

        setTransferZamTotal(transferZamTotal);
        setTransferZamData(transferZamData);

    }, [rate, chartData])

    return (
        <>
            <div className="cards">
                <div className="card">
                    <div className="chart flex flex-column">
                        <div className="blocked-title">Total supply</div>
                        <h3 className="rate-container">{numberFormat(totalSupply)}</h3>
                    </div>
                </div>
                <div className="card-narrow">
                    <div className="card w-full">
                        <SmallAreaChart height="100px" title="Holders" chartKey="amount"
                                        total={extractScalarDataByNetwork(chartData, 'holderCountsTotal', network)}
                                        data={extractGraphDataByNetwork(chartData, 'holderCountsData', 'amount', network)}/>
                    </div>
                </div>

                <div className="card">
                    {
                        network ?
                            <SmallAreaChart height="100px"
                                            title={network === NETWORK_ETH ? `Bridge ETH to BSC` : `Bridge BSC to ETH`}
                                            chartKey="ZAM"
                                            unit="ZAM"
                                            total={extractScalarDataByNetwork(chartData, 'bridgeTotal', network)}
                                            data={extractGraphDataByNetwork(chartData, 'bridgeData', 'ZAM', network)}/>
                            :
                            <div className="chart flex flex-column">
                                <div className="blocked-title">Bridge Total Volume</div>
                                <h3 className="rate-container">
                                    {numberFormat(extractScalarDataByNetwork(chartData, 'bridgeTotalAll', network))}
                                </h3>
                            </div>
                    }
                </div>
                <div className="card-narrow">
                    <div className="card w-full">
                        <SmallAreaChart height="100px" title="Holder All Time" chartKey="amount"
                                        total={extractScalarDataByNetwork(chartData, 'holderAllTimeTotal', network)}
                                        data={extractGraphDataByNetwork(chartData, 'holderAllTimeData', 'amount', network)}/>
                    </div>
                </div>


                {
                    !network ?
                        <div className="card">
                            <LargeAreaChart height="175px" title="Trading Volume (All Time)" chartKey="USD"
                                            prefix="$"
                                            total={marketDataTotal}
                                            data={marketData}/>
                        </div>
                        : ''
                }


                <div className={`${!network ? 'card-narrow' : 'flex w-full'}`}>
                    <div className={`${!network ? 'card w-full' : 'card'}`}>
                        <SmallAreaChart height="100px" title="Transfer Count" chartKey="amount"
                                        total={extractScalarDataByNetwork(chartData, 'transferTotal', network)}
                                        data={extractGraphDataByNetwork(chartData, 'transferData', 'amount', network)}/>
                    </div>
                    <div className={`${!network ? 'card w-full' : 'card-narrow card'}`}>
                        <SmallAreaChart height="100px" title="Transaction Count" chartKey="amount"
                                        total={extractScalarDataByNetwork(chartData, 'transactionTotal', network)}
                                        data={extractGraphDataByNetwork(chartData, 'transactionData', 'amount', network)}/>
                    </div>
                </div>


                <div className="card">
                    <LargeAreaChart height="175px" title="on-Chain Total Volume (All Time)" chartKey="USD"
                                    prefix="$"
                                    total={transferZamTotal}
                                    data={transferZamData}/>
                </div>

                <div className="card-narrow">
                    <div className="card w-full">
                        <div className="chart flex flex-column">
                            <div className="blocked-title">Tokens in Vesting</div>
                            <h3 className="rate-container">
                                {numberFormat(extractScalarDataByNetwork(chartData, 'vestingCountsTotal', network))}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
