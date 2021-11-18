import React, {useContext, useEffect, useState} from 'react';
import { data, totalSupply, barData } from './chart-arrays';
import { SmallAreaChart } from "../z-meta-board/small-area-chart"
import { CustomBarChart } from './bar-chart';
import { LargeAreaChart } from './large-custom-area-chart';
import {ZMetaBoardContext} from "@src/context/zmetaboard-context";
import {extractGraphDataByNetwork} from "@src/utils";

export const Graphics = () => {
    const {chartData, network} = useContext(ZMetaBoardContext);

    return (
        <>
            <div className="cards">
                <div className="card">
                    <CustomBarChart height="175px" title="Circulation" chartKey="ZAM"
                                    data={extractGraphDataByNetwork(chartData, 'circulations', 'ZAM', network)} />
                </div>
                <div className="card card-narrow">
                    <LargeAreaChart height="175px" title="Transfer Count" chartKey="ZAM"
                                    data={extractGraphDataByNetwork(chartData, 'transferred', 'ZAM', network)} />
                </div>
            </div>
            <div className="cards">
                <div className="card">
                    <LargeAreaChart height="175px" title="Blocked" chartKey="ZAM"
                                    data={extractGraphDataByNetwork(chartData, 'blockeds', 'ZAM', network)} />
                </div>

                <div className="card-narrow">
                    <div className="card w-full">
                        <SmallAreaChart height="50px" title="Transaction Count" chartKey="ZAM"
                                        data={extractGraphDataByNetwork(chartData, 'transactions', 'ZAM', network)}  />
                    </div>
                    <div className="card w-full">
                        <SmallAreaChart height="50px" title="Holder Count"
                                          />
                    </div>
                </div>
            </div>

        </>
    )
};
