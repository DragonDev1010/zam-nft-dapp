import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { ProvideAuth } from "../hooks/auth";

import { getPrice } from "@src/api";
import {
  WalletContext,
  walletContextProps,
  ModalContext,
  modalContextProps,
  RateContext,
  UserContext,
  userContextProps,
} from "@src/context";
import { getRefreshToken } from '../services/LocalStorageService';

import { SwapPage } from "@src/pages/swap";
import { AuditsPage } from "@src/pages/audits";
import { BridgePage } from "@src/pages/bridge";
import { FarmPage } from "@src/pages/farming";
import { NftPage } from "@src/pages/nft";
import { ZMetaBoardPage } from "../pages/z-meta-board";
import { StakingPage } from "../pages/staking";
import { ModalsGlobal } from "@src/parts/modals";
import { ZamPadPage } from "@src/pages/zam-pad";
import { OraculaPage } from "@src/pages/oracula";
import { WhiteListPage } from "@src/pages/whitelist";
import { ProfilePage } from "../pages/profile";
import { LoginPage } from "../pages/login";
import { RecoverPassword } from "../pages/recover-password";
import { RecoverEmail } from "../pages/recover-email";
import { ProjectsCalendar } from "../pages/calendar";

import Header from "../parts/header";
import Sidebar from "../parts/sidebar";

export const IndexLayout = () => {
  const loggedIn = getRefreshToken();
  const [rate, setRate] = useState(0);
  const [volume24, setVolume24] = useState(0);
  const [priceChange24, setPriceChange24] = useState(0);
  const [priceChangePercentage24, setPriceChangePercentage24] = useState(0);
  const location = useLocation();
  let timer;

  useEffect(() => {
    getPrice(
      setRate,
      setPriceChange24,
      setPriceChangePercentage24,
      setVolume24
    );
    timer = setInterval(
      () =>
        getPrice(
          setRate,
          setPriceChange24,
          setPriceChangePercentage24,
          setVolume24
        ),
      60000
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <ProvideAuth>
        <WalletContext.Provider value={walletContextProps()}>
          <RateContext.Provider
            value={{ rate, priceChange24, priceChangePercentage24, volume24 }}
          >
            <ModalContext.Provider value={modalContextProps()}>
              <UserContext.Provider value={userContextProps()}>
              {location.pathname !== '/whitelist' ? <Header /> : ''} 
                <main>
                {location.pathname !== '/whitelist' ? <Sidebar /> : ''} 
                  <Switch>
                    <Route path="/swap" component={SwapPage} />
                    <Route path="/bridge" component={BridgePage} />
                    <Route path="/nft" component={NftPage} />
                    <Route path="/farming" component={FarmPage} />
                    <Route path="/z-meta-board" component={ZMetaBoardPage} />
                    <Route path="/staking" component={StakingPage} />
                    <Route path="/audits" component={AuditsPage} />
                    <Route path="/oracula" component={OraculaPage} />
                    <Route path="/calendar" component={ProjectsCalendar} />
                    <Route
                      path="/login"
                      component={LoginPage}
                      loggedIn={loggedIn}
                    />
                    <Route
                      path="/recover-password"
                      component={RecoverPassword}
                    />
                    <Route path="/change-email" component={RecoverEmail} />

                    <PrivateRoute path="/whitelist" component={WhiteListPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <Route path="/" component={ZamPadPage} />
                  </Switch>
                </main>
                <ModalsGlobal />
              </UserContext.Provider>
            </ModalContext.Provider>
          </RateContext.Provider>
        </WalletContext.Provider>
      </ProvideAuth>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getRefreshToken()
  
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
