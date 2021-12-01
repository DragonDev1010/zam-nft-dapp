import React from 'react';
import {Area, XAxis, Tooltip, ResponsiveContainer, AreaChart} from 'recharts';
import {numberFormat} from "@src/utils";

export const SmallAreaChart = ({data, height, title, chartKey, total, unit = '', additionalValue = ''}) => {
    return (
        <div className="chart small-cart">
            <div className={`small-cart__column-left ${!data.length ? 'w-full' : ''}`}>
                <div className="blocked-title">{title}</div>
                <h3 className="rate-container">{numberFormat(total)} {unit}</h3>

                {
                    !additionalValue ||
                    <div className="tvr-block-body-span">
                        {additionalValue}
                    </div>
                }

            </div>

            {
                !data.length ||
                <div className="small-cart__column-right">
                    <div style={{height, width: "100%"}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}

                            >
                                <XAxis tick={{fontSize: 13}} dataKey="name"/>
                                <Tooltip/>
                                <Area type="monotone" dataKey={chartKey} stroke="#4A9DFB" fill="url(#graph-gradient)"
                                      strokeWidth="2"/>
                                <defs>
                                    <linearGradient id="graph-gradient" gradientTransform="rotate(90)">
                                        <stop offset="0" stopColor="#4A9DFB"/>
                                        <stop offset="1" stopColor="#4A9DFB" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            }


        </div>
    );
}
