import React, {useEffect, useState} from "react";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import {SwapPage} from "@src/pages/swap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {BridgePage} from "@src/pages/bridge";
import {FarmPage} from "../pages/farming";
import {
    WalletContext,
    walletContextProps,
    ModalWalletContext,
    modalWalletContextProps,
    RateContext
} from "@src/context";
import {getPrice} from "@src/actions/swap";


export const IndexLayout = () => {
    const [rate, setRate] = useState();
    const [priceChange24, setPriceChange24] = useState(0);
    const [priceChangePercentage24, setPriceChangePercentage24] = useState(0);

    useEffect(() => {
        getPrice(setRate, setPriceChange24, setPriceChangePercentage24);
        const timer = setInterval(() => getPrice(setRate, setPriceChange24, setPriceChangePercentage24), 5000);
        return () => {
            clearInterval(timer)
        };
    }, []);

    return (
        <Router>
            <WalletContext.Provider value={walletContextProps()}>
                <RateContext.Provider value={{rate, priceChange24, priceChangePercentage24}}>
                    <ModalWalletContext.Provider value={modalWalletContextProps()}>
                        <Header/>
                        <main>
                            <Sidebar/>
                            <Switch>
                                <Route path="/swap" component={SwapPage}/>
                                <Route path="/bridge" component={BridgePage}/>
                                <Route path="/farming" component={FarmPage}/>
                            </Switch>
                        </main>
                    </ModalWalletContext.Provider>
                </RateContext.Provider>
            </WalletContext.Provider>
        </Router>

    )
}

