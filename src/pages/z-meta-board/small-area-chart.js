import React from 'react';
import { Area, XAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';

export const SmallAreaChart = (props) => {
    return (
        <div style={{ height: props.height }} className="chart-container swap-chart">
            <div className="blocked-title">{props.title}</div>
            <h3 className="rate-container">{props.rate}</h3>
            <div className="duration-container">Past 24h</div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={props.data}
                    margin={{
                        top: 0,
                        right: 10,
                        left: 10,
                        bottom: 40,
                    }}
                >
                    <XAxis tick={{ fontSize: 13 }} dataKey="name" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#2CDD74" fill="url(#graph-gradient)" strokeWidth="2" />
                    <defs>
                        <linearGradient id="graph-gradient" gradientTransform="rotate(90)">
                            <stop offset="0" stopColor="#5bbc6d" />
                            <stop offset="1" stopColor="#5bbc6d" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
