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


export const IndexLayout = () =>
    <Router>
        <Header/>
        <main>
            <Sidebar/>
            <Switch>
                <Route path="/swap" component={SwapPage}/>
                <Route path="/bridge" component={BridgePage}/>
            </Switch>

        </main>
    </Router>


