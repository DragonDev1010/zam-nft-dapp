import React, {useContext, useEffect, useState} from 'react';
import {TOKEN_USDT, TOKEN_ZAM, TOKENS, MONTH_NAMES} from "@src/constants";
import {SwapContext, RateContext} from "@src/context";
import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {formatChartDate, toFixed} from "@src/utils";
import {GRAPH_URL} from "@src/config/networks";


const ranges = {'hour': 'H', 'day': 'D', 'week': 'W'};

const schemas = {'hour': 'pairHourDatas', 'day': 'pairDayDatas', 'week': 'pairWeekDatas'};

export const SwapChart = ({mainToken}) => {
    const {rate, priceChange24, priceChangePercentage24} = useContext(RateContext);
    const {swapFrom, swapTo, setSwapFrom, setSwapTo} = useContext(SwapContext);
    const [range, setRange] = useState('hour');
    const [graphData, setGraphData] = useState([]);
    const [data, setData] = useState([]);

    const revertHandler = (event) => {
        event.preventDefault();
        setSwapFrom(swapTo);
        setSwapTo(swapFrom);
    }

    useEffect(() => {
        const query = `{
              pairHourDatas(first: 1000, where: {pair: "0x40b901e5f12bd33ba33a752dab41240d80b97082"}) {
                token1Price
                token0Price
                periodBegin,
                periodEnd,
              },
              pairDayDatas(first: 1000, where: {pair: "0x40b901e5f12bd33ba33a752dab41240d80b97082"}) {
                token1Price
                token0Price
                periodBegin,
                periodEnd,
              },
              pairWeekDatas(first: 1000, where: {pair: "0x40b901e5f12bd33ba33a752dab41240d80b97082"}) {
                token1Price
                token0Price
                periodBegin,
                periodEnd,
              },
            }`;
        fetch(GRAPH_URL.PAIR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query})
        })
            .then(response => response.json())
            .then(response => setGraphData(response.data));
    }, [range]);

    useEffect(() => {
        if (!Object.keys(graphData).length) {
            return;
        }
        const schema = schemas[range];
        const data = graphData[schema].map(({periodBegin, token1Price, token0Price}) => {

            return {
                name: formatChartDate(periodBegin, range),
                [TOKEN_ZAM]: toFixed(token1Price),
                [TOKEN_USDT]: toFixed(token0Price),
            }
        });
        setData(data);
    }, [range, graphData])

    const tickFormatter = (value) => value.toString().replace(/,.+/, '');

    return (
        <div className="card card-filled chart swap-chart">
            <header>
                <div className="swap-chart__tokens">
                    <div className="swap-chart__tokens-images">
                        <img src={TOKENS[swapFrom].icon} alt=""/>
                        <img src={TOKENS[swapTo].icon} alt=""/>
                    </div>
                    <div className="swap-chart__tokens-names">
                        {TOKENS[swapFrom].name} <span>/ {TOKENS[swapTo].name}</span>
                    </div>
                    <div className="swap-chart__tokens-revert">
                        <a href="#" onClick={revertHandler}>
                            <img src="images/icon_revert.svg" alt=""/>
                        </a>
                    </div>
                </div>
                <div className="chart__ranges">
                    <ul>
                        {
                            Object.keys(ranges)
                                .map(i => <li className={i === range ? `active` : ``}
                                              key={`swap_chart_ranges_${i}`}
                                              onClick={() => setRange(i)}>{ranges[i]}</li>)
                        }
                    </ul>
                </div>
            </header>

            <h3 className="chart__rate swap-chart__rate">
                {swapFrom === mainToken ? rate : toFixed(1 / rate)} <span>{TOKENS[swapTo].name}</span>
            </h3>
            <div className={`swap-chart__rate-change ${swapFrom === mainToken && priceChange24 < 0 ? 'red' : ''}`}>
                {
                    swapFrom === mainToken
                        ? `${priceChange24} (${priceChangePercentage24}%)`
                        : `${-priceChange24} (${-priceChangePercentage24}%)`
                } <span>24h</span>
            </div>

            <div className="chart__chart">

                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        {/*<CartesianGrid strokeDasharray="3 3" />*/}
                        <XAxis dataKey="name" tickFormatter={tickFormatter}/>
                        {/*<YAxis />*/}
                        <Tooltip/>
                        <Area type="monotone" dataKey={swapFrom} stroke="#2CDD74" fill="url(#graph-gradient)"
                              strokeWidth="2"/>
                        <defs>
                            <linearGradient id="graph-gradient" gradientTransform="rotate(90)">
                                <stop offset="0" stopColor="#5bbc6d"/>
                                <stop offset="1" stopColor="#5bbc6d" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};
