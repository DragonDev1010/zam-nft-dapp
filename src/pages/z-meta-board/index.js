import React, {useEffect, useState} from 'react';
import {Header} from './header';
import {Graphics} from "./graphics";
import {NETWORK_BSC, NETWORK_ETH} from "@src/constants";
import {zamGraphData} from "@src/pages/z-meta-board/chart-data";
import {ZMetaBoardContext} from "@src/context/zmetaboard-context";
import {mergeObjects} from "@src/utils";


export const ZMetaBoardPage = () => {
    const [chartData, setChartData] = useState();
    const [network, setNetwork] = useState();
    const [range, setRange] = useState('all');

    useEffect(async () => {
        const chartData = {
            [NETWORK_ETH]: await zamGraphData(NETWORK_ETH, range),
            [NETWORK_BSC]: await zamGraphData(NETWORK_BSC, range),
        }
        chartData.pair = mergeObjects(chartData[NETWORK_ETH], chartData[NETWORK_BSC]);


        setChartData(chartData)
    }, [range]);


    return (
        <ZMetaBoardContext.Provider value={{chartData, network, setNetwork, range, setRange}}>
            <article className="z-meta-board">
                <Header/>
                <Graphics/>
            </article>
        </ZMetaBoardContext.Provider>
    )
};
