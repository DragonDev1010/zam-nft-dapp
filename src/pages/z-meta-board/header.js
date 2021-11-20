import React, {useContext, useEffect, useState} from 'react';
import {ZMetaBoardContext} from "@src/context/zmetaboard-context";
import {NETWORK_BSC, NETWORK_ETH, NETWORKS, TOTAL_SUPPLY} from "@src/constants";
import {extractGraphDataByNetwork, extractScalarDataByNetwork, numberFormat} from "@src/utils";
import {RateContext} from "@src/context";
import {zamGraphPairData} from "@src/pages/z-meta-board/chart-data";

const ranges = {'day': '24H', 'week': '1W', 'month': '1M', 'all': 'All'};

export const Header = () => {
    const {network, setNetwork, range, setRange, chartData} = useContext(ZMetaBoardContext);
    const {rate, volume24} = useContext(RateContext);
    const [reserve, setReserve] = useState(0);
    const circulationsSupply = extractScalarDataByNetwork(chartData, 'circulationsTotal', network) ?? 0;

    // useEffect(async () => {
    //     const {reserve} = await zamGraphPairData();
    //     setReserve(reserve);
    // }, [])

    return (
        <>
            <div className="z-meta-board__header-container">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="farming-container">
                        zMetaBoard
                    </p>
                    <div className="zam-values-container">
                        <div className="value-container">
                            <div style={{ color: "#2DFF82" }} className="zam-value">
                                {numberFormat(circulationsSupply) ?? 0} ZAM
                            </div>
                            <div className="zam-value-title">
                                Circulating Supply
                            </div>
                        </div>
                        <div className="value-container">
                            <div className="zam-value">
                                ${numberFormat(parseInt(volume24)) ?? 0}
                            </div>
                            <div className="zam-value-title">
                                Trading Volume (24h)
                            </div>
                        </div>
                        <div className="value-container">
                            <div className="zam-value">
                                ${rate ? numberFormat(parseInt(TOTAL_SUPPLY * rate)) : 0}

                            </div>
                            <div className="zam-value-title">
                                Fully Diluted Market Cap
                            </div>
                        </div>
                        {/*<div className="value-container">*/}
                        {/*    <div className="zam-value">*/}
                        {/*        ${numberFormat(reserve)}*/}
                        {/*    </div>*/}
                        {/*    <div className="zam-value-title">*/}
                        {/*        Total Value Locked (TVL)*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="z-meta-board__filters">
                        <div className="button-outlines z-meta-board__filters-buttons">
                            <button onClick={() => setNetwork()} className={`button-outline ${network ?? 'current'}`}>
                                <span className="hidden-sm">All Networks</span>
                                <span className="visible-sm">All Networks</span>
                            </button>
                            <button onClick={() => setNetwork(NETWORK_ETH)} className={`button-outline ${network === NETWORK_ETH ? 'current' : ''}`}>
                                <img className="button-outline__icon" src={NETWORKS[NETWORK_ETH].icon} />
                                <span className="hidden-sm">{NETWORKS[NETWORK_ETH].name}</span>
                                <span className="visible-sm">ETH</span>
                            </button>
                            <button onClick={() => setNetwork(NETWORK_BSC)} className={`button-outline ${network === NETWORK_BSC ? 'current' : ''}`}>
                                <img className="button-outline__icon" src={NETWORKS[NETWORK_BSC].icon} />
                                <span className="hidden-sm">{NETWORKS[NETWORK_BSC].name}</span>
                                <span className="visible-sm">BSC</span>
                            </button>
                        </div>
                        {/*<div className="chart__ranges">*/}
                        {/*    <ul>*/}
                        {/*        {*/}
                        {/*            Object.keys(ranges)*/}
                        {/*                .map(i => <li className={i === range ? `active` : ``}*/}
                        {/*                              key={`swap_chart_ranges_${i}`}*/}
                        {/*                              onClick={() => setRange(i)}>{ranges[i]}</li>)*/}
                        {/*        }*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        </>
    )
};
