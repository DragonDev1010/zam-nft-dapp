import React from 'react';
import { Area, XAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';

export const SmallAreaChartBlock = (props) => {
    return (
        <div style={{ height: "123px", width: "450px", display: "flex" }} className="small-block-chart-container swap-chart">
            <div>
                <div className="blocked-title">{props.title}</div>
                <h3 className="rate-container">{props.rate}</h3>
                <div className="tvr-block-body-span">{props.titleFooter} </div>
            </div>
            <div style={{ width: props.chartWidth }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart margin={{ left: 10 }} data={props.data}>
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
}
