import React from 'react';
import { Area, XAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';
import {numberFormat} from "@src/utils";

export const LargeAreaChart = ({data, height, title, chartKey }) => {
    return (
        <div className="chart flex flex-column">
            <div className="blocked-title">{title}</div>
            <h3 className="rate-container">{data.length ? numberFormat(data[data.length - 1][chartKey])  : 0} {chartKey}</h3>
            <div style={{ height, marginTop: 'auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}

                    >
                        <XAxis tick={{ fontSize: 13 }} dataKey="name" />
                        <Tooltip />
                        <Area type="monotone" dataKey={chartKey} stroke="#4A9DFB" fill="url(#graph-gradient)" strokeWidth="2" />
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
}
