import React from 'react';
import { data, totalSupply, barData } from './chart-arrays';
import { SmallAreaChart } from "../z-meta-board/small-area-chart"
import { CustomBarChart } from './bar-chart';
import { LargeAreaChart } from './large-custom-area-chart';

export const Graphics = () => {
    const flexStyle = {
        width: "100%",
        display: "flex"
    }
    return (
        <>
            <div style={flexStyle}>
                <CustomBarChart title="Circulation" rate="65 230 014 ZAM" swapChart={barData} />
                <div>
                    <SmallAreaChart height="300px" title="Transfer Count" rate="34 614 335" data={data} />
                </div>
            </div>
            <div style={flexStyle}>
                <LargeAreaChart title="Blocked" rate="545 765 ZAM" swapChart={data} />
                <div>
                    <SmallAreaChart height="202px" title="Transfer Count" rate="54 776 221" data={data} />
                    <SmallAreaChart height="202px" title="Transaction Count" rate="54 776 221" data={data} />
                </div>
            </div>
            <div style={flexStyle}>
                <LargeAreaChart title="Total Supply" rate="80 000 000 ZAM" swapChart={totalSupply} />
                <div>
                    <SmallAreaChart height="202px" title="Bridge" rate="285 230 ZAM" data={data} />
                    <SmallAreaChart height="202px" title="Vester" rate="121 574" data={data} />
                </div>
            </div>
        </>
    )
};
