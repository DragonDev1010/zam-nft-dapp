import React, {useState} from 'react';
import {BridgeContext} from "@src/context";
import {NETWORK_BSC, NETWORK_ETH, SWAP_ETH_BSC} from "@src/constants";
import {BridgeSwitcher} from "@src/pages/bridge/bridge-switcher";
import {BridgeTransactions} from "@src/pages/bridge/bridge-transactions";


export const BridgePage = () => {
    const [bridgeFrom, setBridgeFrom] = useState(NETWORK_ETH);
    const [bridgeTo, setBridgeTo] = useState(NETWORK_BSC);
    const [swapMethod, setSwapMethod] = useState(SWAP_ETH_BSC);

    return (
        <article>
            <div className="cards cards-column-revert">
                <BridgeContext.Provider
                    value={{bridgeFrom, setBridgeFrom, bridgeTo, setBridgeTo, swapMethod, setSwapMethod}}>
                    <BridgeTransactions/>
                    <BridgeSwitcher/>
                </BridgeContext.Provider>
            </div>
        </article>
    )
};

