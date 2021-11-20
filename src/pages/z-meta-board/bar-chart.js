import React from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {numberFormat} from "@src/utils";

export const CustomBarChart = ({data, height, title, chartKey }) => {
    return (
        <div className="chart flex flex-column">
            <div className="blocked-title">{title}</div>
            <h3 className="rate-container">{data.length ? numberFormat(data[data.length - 1][chartKey]) : 0} {chartKey}</h3>

            <div style={{ height, marginTop: 'auto' }}>
                <ResponsiveContainer width="100%">
                    <BarChart data={data}>
                        <XAxis tick={{fontSize: 15}} dataKey="name"/>
                        <Tooltip/>
                        <Bar dataKey={chartKey} fill="#4A9DFB" radius={[10, 10, 10, 10]} width="10"/>
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}
