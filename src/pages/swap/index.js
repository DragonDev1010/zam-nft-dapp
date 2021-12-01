import React, {useEffect, useState} from 'react';
import {SwapContext} from "@src/context";
import {SwapSwitcher} from "@src/pages/swap/swap-switcher";
import {SwapChart} from "@src/pages/swap/swap-chart";
import {TOKEN_USDT, TOKEN_ZAM} from "@src/constants";


export const SwapPage = () => {
    const [swapFrom, setSwapFrom] = useState(TOKEN_ZAM);
    const [swapTo, setSwapTo] = useState(TOKEN_USDT);
    const [isPending, setIsPending] = useState();

    return (
        <article>
            <div className="cards cards-column-revert">
                <SwapContext.Provider value={{swapFrom, setSwapFrom, swapTo, setSwapTo, isPending, setIsPending}}>
                    <SwapChart mainToken={TOKEN_ZAM}/>
                    <SwapSwitcher mainToken={TOKEN_ZAM}/>
                </SwapContext.Provider>
            </div>
        </article>
    )
};

