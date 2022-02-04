import React, {useState} from 'react';
import {BridgeContext} from "@src/context";
import {NETWORK_BSC, NETWORK_ETH, SWAP_ETH_BSC} from "@src/constants";
import {BridgeSwitcher} from "@src/pages/bridge/bridge-switcher";
import {BridgeTransactions} from "@src/pages/bridge/bridge-transactions";
import {MetaTagsComponent} from "@src/components/metatags";


export const BridgePage = () => {
    const [bridgeFrom, setBridgeFrom] = useState(NETWORK_ETH);
    const [bridgeTo, setBridgeTo] = useState(NETWORK_BSC);
    const [swapMethod, setSwapMethod] = useState(SWAP_ETH_BSC);
    const [isPending, setIsPending] = useState();

    return (
        <article>
            <MetaTagsComponent page="bridge"/>

            <div className="cards cards-column-revert">
                <BridgeContext.Provider
                    value={{bridgeFrom, setBridgeFrom, bridgeTo, setBridgeTo, swapMethod, setSwapMethod,
                        isPending,
                        setIsPending}}>
                    <BridgeTransactions/>
                    <BridgeSwitcher/>
                </BridgeContext.Provider>
            </div>
        </article>
    )
};

