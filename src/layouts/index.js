import React from "react";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import { SwapPage } from "@src/pages/swap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { BridgePage } from "@src/pages/bridge";
import { FarmPage } from "../pages/farming";
import { ZMetaBoardPage } from "../pages/z-meta-board";
import { StakingPage } from "../pages/staking";
import { MainPage } from "../pages/main";

export const IndexLayout = () =>
    <Router>
        <Header />
        <main>
            <Sidebar />
            <Switch>
                <Route path="/swap" component={SwapPage} />
                <Route path="/bridge" component={BridgePage} />
                <Route path="/farming" component={FarmPage} />
                <Route path="/z-meta-board" component={ZMetaBoardPage} />
                <Route path="/staking" component={StakingPage} />
                <Route path="/" component={MainPage} />
            </Switch>
        </main>
    </Router>


