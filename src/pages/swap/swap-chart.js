import React, {useContext, useEffect, useState} from 'react';
import {TOKEN_USDT, TOKEN_ZAM, TOKENS} from "@src/constants";
import {SwapContext, RateContext} from "@src/context";
import {AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {toFixed} from "@src/utils";


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ranges = {'hour': 'H', 'day': 'D', 'week': 'W'};


export const SwapChart = ({mainToken}) => {
    const {rate, priceChange24, priceChangePercentage24} = useContext(RateContext);
    const {swapFrom, swapTo, setSwapFrom, setSwapTo} = useContext(SwapContext);
    const [range, setRange] = useState('hour');
    const [data, setData] = useState([]);

    const revertHandler = (event) => {
        event.preventDefault();
        setSwapFrom(swapTo);
        setSwapTo(swapFrom);
    }

    useEffect(() => {
        let schema = '';

        switch (range) {
            case 'hour':
                schema = 'pairHourDatas';
                break;
            case 'day':
                schema = 'pairDayDatas';
                break;
            case 'week':
                schema = 'pairWeekDatas';
                break;
        }

        const query = `{
          ${schema}(where: {pair: "0x40b901e5f12bd33ba33a752dab41240d80b97082"}) {
            token1Price
            token0Price
            periodBegin,
            periodEnd,
          }
          
        }`;
        fetch('https://api.thegraph.com/subgraphs/name/zambit/zampairgraph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query})
        })
            .then(response => response.json())
            .then(response => {
                const data = response.data[schema].map(({periodBegin, periodEnd, token1Price, token0Price}) => {
                    const dateBegin = new Date(periodBegin * 1000);
                    const dateEnd = new Date(periodEnd * 1000);

                    let name = '';
                    switch (range) {
                        case 'hour':
                            name = `${monthNames[dateBegin.getMonth()]}. ${dateBegin.getDate()}, ${dateEnd.toLocaleString('en-US', { hour: 'numeric', hour12: true })}`
                            break;
                        case 'day':
                        case 'week':
                            name = `${dateEnd.getDate()} ${monthNames[dateBegin.getMonth()]}. ${dateBegin.getFullYear()}`
                            break;
                    }

                    return {
                        name,
                        [TOKEN_ZAM]: toFixed(token1Price),
                        [TOKEN_USDT]: toFixed(token0Price),
                    }
                });
                setData(data);
            });
    }, [range]);

    const tickFormatter = (value) => '';

    return (
        <div className="card swap-chart">
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
                <div className="swap-chart__ranges">
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

            <h3 className="swap-chart__rate">
                {swapFrom === mainToken ? rate : toFixed(1 / rate)} <span>{TOKENS[swapTo].name}</span>
            </h3>
            <div className={`swap-chart__rate-change ${swapFrom === mainToken && priceChange24 < 0 ? 'red' : ''}`}>
                {
                    swapFrom === mainToken
                        ? `${priceChange24} (${priceChangePercentage24}%)`
                        : `${-priceChange24} (${-priceChangePercentage24}%)`
                } <span>24h</span>
            </div>

            <div className="swap-chart__chart">

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
