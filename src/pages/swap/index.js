import React, {useState} from 'react';
import {SwapContext} from "@src/context";
import {SwapSwitcher} from "@src/pages/swap/swap-switcher";
import {SwapChart} from "@src/pages/swap/swap-chart";
import {TOKEN_ETH, TOKEN_ZAM} from "@src/constants";


export const SwapPage = () => {
    const [swapFrom, setSwapFrom] = useState(TOKEN_ZAM);
    const [swapTo, setSwapTo] = useState(TOKEN_ETH);

    return (
        <article>
            <div className="cards">
                <SwapContext.Provider value={{swapFrom, setSwapFrom, swapTo, setSwapTo}}>
                    <SwapChart/>
                    <SwapSwitcher/>
                </SwapContext.Provider>
            </div>
        </article>
    )
};

