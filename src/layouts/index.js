import React, {useEffect, useState} from "react";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import {SwapPage} from "@src/pages/swap";
import { AuditsPage } from "../pages/audits";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {BridgePage} from "@src/pages/bridge";
import {FarmPage} from "@src/pages/farming";
import {
    WalletContext,
    walletContextProps,
    ModalWalletContext,
    modalWalletContextProps,
    RateContext
} from "@src/context";
import {getPrice} from "@src/api";
import {ZMetaBoardPage} from "../pages/z-meta-board";
import {StakingPage} from "../pages/staking";
import {MainPage} from "../pages/main";

export const IndexLayout = () => {
    const [rate, setRate] = useState();
    const [volume24, setVolume24] = useState(0);
    const [priceChange24, setPriceChange24] = useState(0);
    const [priceChangePercentage24, setPriceChangePercentage24] = useState(0);
    let timer;

    useEffect(() => {
        getPrice(setRate, setPriceChange24, setPriceChangePercentage24, setVolume24);
        timer = setInterval(() => getPrice(setRate, setPriceChange24, setPriceChangePercentage24, setVolume24), 60000);
        return () => {
            clearInterval(timer)
        };
    }, []);

    return (
        <Router>
            <WalletContext.Provider value={walletContextProps()}>
                <RateContext.Provider value={{rate, priceChange24, priceChangePercentage24, volume24}}>
                    <ModalWalletContext.Provider value={modalWalletContextProps()}>
                        <Header/>
                        <main>
                            <Sidebar/>
                            <Switch>
                                <Route path="/swap" component={SwapPage}/>
                                <Route path="/bridge" component={BridgePage}/>
                                <Route path="/farming" component={FarmPage}/>
                                <Route path="/z-meta-board" component={ZMetaBoardPage}/>
                                <Route path="/staking" component={StakingPage}/>
                                <Route path="/audits" component={AuditsPage} />
                <Route path="/" component={MainPage}/>
                            </Switch>
                        </main>
                    </ModalWalletContext.Provider>
                </RateContext.Provider>
            </WalletContext.Provider>
        </Router>

    )
}

