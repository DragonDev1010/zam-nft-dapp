import React from 'react';

import { Header } from './header';
import { MainCard } from './main-card';
import {MetaTagsComponent} from "@src/components/metatags";
export const MainPage = () => {


    return (
        <article className="background-glow">
            <MetaTagsComponent page="main"/>
            <Header />
            <div className="main-cards">
                <MainCard className="main-card main-card__bg_1" text={<>Create <span>DeFi Wallet</span> in ZamWallet</>} href="https://mobile.zam.io" isExt/>
                <MainCard className="main-card main-card__bg_2" text={<><span>Swap</span> ZAM token<br/>via DEX</>} button="Swap ZAM" href="/swap"/>
                <MainCard className="main-card main-card__bg_3" text={<>Staking ZAM <br/>Up to <span>89% APR</span></>} button="Stake ZAM" href="/staking"/>
                <MainCard className="main-card main-card__bg_4" text={<>Bridge ZAM <span>ETH-BSC</span></>} button="Go to the bridge" href="/bridge"/>
                <MainCard className="main-card main-card__bg_5" text={<><span>zMetaBoard</span><br/>Analytics Dashboard</>}  href="/z-meta-board"/>
                <MainCard className="main-card main-card__bg_6" text={<><span>Farming</span><br/>Provide Liquidity, <br/>Earn ZAM</>}  href="/farming" isSoon/>
                <MainCard className="main-card main-card__bg_7" text={<><span>Invest Portfolios</span><br/>Crypto Indexes on <br/>Smart Contracts</>} href="#"  isSoon/>
                <MainCard className="main-card main-card__bg_8" text={<><span>Branded NFTs</span><br/>from Zamio Team</>} href="#" isSoon/>
            </div>
        </article >

)
};
