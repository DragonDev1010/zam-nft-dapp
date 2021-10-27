import React, {useState} from 'react';
import {BridgeContext} from "@src/context";
import {NETWORK_BSC, NETWORK_ETH} from "@src/constants";
import {BridgeSwitcher} from "@src/pages/bridge/bridge-switcher";
import {BridgeTransactions} from "@src/pages/bridge/bridge-transactions";


export const BridgePage = () => {
    const [bridgeFrom, setBridgeFrom] = useState(NETWORK_ETH);
    const [bridgeTo, setBridgeTo] = useState(NETWORK_BSC);

    return (
        <article>
            <div className="cards">
                <BridgeContext.Provider value={{bridgeFrom, setBridgeFrom, bridgeTo, setBridgeTo}}>
                    <BridgeTransactions/>
                    <BridgeSwitcher/>
                </BridgeContext.Provider>
            </div>
        </article>
    )
};

