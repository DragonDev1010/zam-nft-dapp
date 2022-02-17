import React, { useEffect, useState } from "react";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import { SwapPage } from "@src/pages/swap";
import { AuditsPage } from "@src/pages/audits";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { BridgePage } from "@src/pages/bridge";
import { FarmPage } from "@src/pages/farming";
import {
    WalletContext,
    walletContextProps,
    ModalContext,
    modalContextProps,
    RateContext
} from "@src/context";
import { getPrice } from "@src/api";
import { ZMetaBoardPage } from "../pages/z-meta-board";
import { StakingPage } from "../pages/staking";
import { MainPage } from "../pages/main";
import { ModalsGlobal } from "@src/parts/modals";
import { ZamPadPage } from "@src/pages/zam-pad";
import { HighstreetPage } from "@src/pages/highstreet";
import { WhiteListPage } from "@src/pages/whitelist";

export const IndexLayout = () => {
    const [rate, setRate] = useState(0);
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
                <RateContext.Provider value={{ rate, priceChange24, priceChangePercentage24, volume24 }}>
                    <ModalContext.Provider value={modalContextProps()}>
                        <Header />
                        <main>
                            <Sidebar />
                            <Switch>
                                <Route path="/swap" component={SwapPage} />
                                <Route path="/bridge" component={BridgePage} />
                                <Route path="/farming" component={FarmPage} />
                                <Route path="/z-meta-board" component={ZMetaBoardPage} />
                                <Route path="/staking" component={StakingPage} />
                                <Route path="/audits" component={AuditsPage} />
                                <Route path="/zam-pad" component={ZamPadPage} />
                                <Route path="/highstreet" component={HighstreetPage} />
                                <Route path="/whitelist" component={WhiteListPage} />
                                <Route path="/" component={MainPage} />
                            </Switch>
                        </main>
                        <ModalsGlobal />
                    </ModalContext.Provider>
                </RateContext.Provider>
            </WalletContext.Provider>
        </Router>

    )
}

