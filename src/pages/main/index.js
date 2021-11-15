import React from 'react';
import { Header } from './header';
import { MainCard } from './main-card';
import { SwapCard } from './cards/swap-card';
import { StakingCard } from './cards/staking-card';
import { BridgeCard } from './cards/bridge-card';
import { BrandedCard } from './cards/branded';
export const MainPage = () => {

    let backgrounds = [
        {
            "path": "url(../../../images/create-defi-wallet.png)"
        },
        {
            "path": "url(../../../images/swap.png)"
        },
        {
            "path": "url(../../../images/staking.png)"
        },
        {
            "path": "url(../../../images/bridge.png)"
        },
        {
            "path": "url(../../../images/z-meta-board.png)"
        },
        {
            "path": "url(../../../images/farming.png)"
        },
        {
            "path": "url(../../../images/invest.png)"
        },
        {
            "path": "url(../../../images/branded-nft.png)"
        },
    ]



    return (
        <article>
            <div className="general-container">
                <Header />
            </div>
            <div className="main-body-container">
                <MainCard background={backgrounds[0].path} isEnableTitle="true" />
                <SwapCard background={backgrounds[1].path} isEnableButton="true" buttonContent="Swap ZAM" />
                <StakingCard background={backgrounds[2].path} isEnableButton="true" buttonContent="Stake ZAM" />
                <BridgeCard background={backgrounds[3].path} isEnableButton="true" buttonContent="Go to the Bridge" />
                <MainCard background={backgrounds[4].path} />
                <MainCard background={backgrounds[5].path} />
                <MainCard background={backgrounds[6].path} />
                <BrandedCard background={backgrounds[7].path} />
            </div>
        </article >
    )
};
