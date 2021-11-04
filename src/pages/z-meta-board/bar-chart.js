import React, { useContext, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ranges = { 'day': '24H', 'week': '1W', 'month': '1M' };


export const CustomBarChart = (props) => {
    const [range, setRange] = useState('month');
    return (
        <div className="card swap-chart">
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
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={props.swapChart}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis tick={{ fontSize: 15 }} dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="amt" radius={[10, 10, 10, 10]} fill="#5bbc6d" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};
