import React from "react";
import Header from "../parts/header";
import Sidebar from "../parts/sidebar";
import {SwapPage} from "@src/pages/swap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {BridgePage} from "@src/pages/bridge";
import { FarmPage } from "../pages/farming";
import { ZMetaBoardPage } from "../pages/z-meta-board";


export const IndexLayout = () =>
    <Router>
        <Header/>
        <main>
            <Sidebar/>
            <Switch>
                <Route path="/swap" component={SwapPage}/>
                <Route path="/bridge" component={BridgePage}/>
                <Route path="/farming" component={FarmPage}/>
                <Route path="/z-meta-board" component={ZMetaBoardPage}/>
            </Switch>
        </main>
    </Router>


