import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ranges = { 'day': '24H', 'week': '1W', 'month': '1M' };


export const LargeAreaChart = (props) => {
    const [range, setRange] = useState('month');
    return (
        <div className="large-chart-container swap-chart">
            <header>
                <div className="swap-chart__tokens" />
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
            <div>
                <div className="blocked-title">{props.title}</div>
                <h3 className="swap-chart__rate">{props.rate}</h3>
                <div className="duration-container">Past 24h</div>
            </div>
            <div className="swap-chart__chart">
                <ResponsiveContainer width="100%" height="60%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={props.swapChart}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#4A9DFB" fill="url(#graph-gradient)" strokeWidth="2" />
                        <defs>
                            <linearGradient id="graph-gradient" gradientTransform="rotate(90)">
                                <stop offset="0" stopColor="#4A9DFB" />
                                <stop offset="1" stopColor="#4A9DFB" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
