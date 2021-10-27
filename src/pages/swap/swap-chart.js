import React, {useContext, useState} from 'react';
import {TOKENS} from "@src/constants";
import {SwapContext} from "@src/context";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Sep 10',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Sep 12',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Sep 14',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Sep 16',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Sep 18',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Sep 20',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Sep 22',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const ranges = {'day': '24H', 'week': '1W', 'month': '1M'};


export const SwapChart = () => {
    const {swapFrom, swapTo, setSwapFrom, setSwapTo} = useContext(SwapContext);
    const [range, setRange] = useState('month');

    const revertHandler = (event) => {
        event.preventDefault();
        setSwapFrom(swapTo);
        setSwapTo(swapFrom);
    }

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
                            <img src="/images/icon_revert.svg" alt=""/>
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

            <h3 className="swap-chart__rate">23.432342 <span>ETH</span></h3>
            <div className="swap-chart__rate-change">+0.5435823 ZAM (29.46%) <span>24h</span></div>

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
                        <XAxis dataKey="name" />
                        {/*<YAxis />*/}
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#2CDD74" fill="url(#graph-gradient)" strokeWidth="2" />
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
