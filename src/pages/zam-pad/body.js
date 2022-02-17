import React from 'react';
import { SalesCardSmall } from './sales-card-small';
import { ByZam } from './by-zam';
import { BigCard } from './big-card';
import { ParticipateCard } from "./participate-card";
import { Button } from "./button";
import { Table } from './table';
import { Nft } from './nft-card';
export const Body = (props) => {

    return (
        <>
            <div className="zam-pad__body-container">
                <div className="zam-pad__body-container__sales-title">
                    Live and Upcoming Sales
                </div>
                <div className="zam-pad__body-container__sales-body">
                    <div className="zam-pad__body-container__sales-body__small-cards">
                        <SalesCardSmall />
                        <ByZam content="123" />
                    </div>
                    <div className="zam-pad__body-container__sales-body__large_cards">
                        <div style={{ width: "90%", display: "flex" }}>
                            <div className="zam-pad__body-container__sales-body__left-large-card">
                                <img src="images/zam-pad/sales-icon.svg" />
                            </div>
                            <div className="zam-pad__body-container__sales-body__right-large-card">
                                <div className="large-card__title">
                                    <div className="large-card__title__bsc">
                                        <img src="images/zam-pad/bsc.svg" />
                                        <p className="large-card__title__bsc__p">BSC</p>
                                    </div>
                                    <div className="large-card__title__badges">
                                        <div className="large-card__title__badges__meta">
                                            Meta
                                        </div>
                                        <div className="large-card__title__badges__soon">
                                            Coming Soon
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <div className="large-card__content">
                                        Wilder World
                                    </div>
                                    <div className="large-card__description">
                                        Decentralized NFT Market and Artist Guild
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="large-card__time">
                                    <div>
                                        <div className="large-card__time__title">
                                            IDO Strarts In:
                                        </div>
                                        <div className="large-card__time__content">
                                            1:23:15:17
                                        </div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <div className="large-card__time__raise-title">
                                            Total Raise
                                        </div>
                                        <div className="large-card__time__raise-content">
                                            <img style={{ marginRight: "4%" }} src="images/zam-pad/usd.svg" />
                                            <div>
                                                3mln USDT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="large-card__footer">
                                    <div>
                                        <div className="large-card__footer__title">
                                            Followers:
                                        </div>
                                        <div className="large-card__footer__content">
                                            12 432
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-card__footer__title">
                                            Community Score:
                                        </div>
                                        <div className="large-card__footer__content__center">
                                            👌 9.32/10
                                        </div>
                                    </div>
                                    <div>
                                        <div className="large-card__footer__title">
                                            Access
                                        </div>
                                        <div className="large-card__footer__content">
                                            Private
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="big-cards-container">
                    <BigCard
                        title="WonderHero"
                        description="Play To Earn Mobile RPG"
                        totalCapacity="200k USDC"
                        followers="12 432"
                        score="👌 9.32/10" access="Public"
                        currentPercent="95%" piece="144 735/200 000"
                        minPercent="(Min. 52%)"
                        progress={80}
                        image="images/zam-pad/thetan-arena.svg"
                        currency="images/zam-pad/ruble.svg"
                        headerImage="../../../images/zam-pad/wonder-hero.svg" />
                    <BigCard
                        title="Highstreet"
                        description="Shopify on an MMORPG"
                        totalCapacity="3mln USDT"
                        followers="12 432"
                        score="👌 9.32/10"
                        access="Private"
                        currentPercent="65%"
                        piece="1 947 355/3 000 000"
                        minPercent="(Min. 52%)"
                        progress={50}
                        image="images/zam-pad/highstreet-image.svg"
                        currency="images/zam-pad/usd.svg"
                        headerImage="../../../images/zam-pad/highstreet.svg" />
                    <BigCard
                        title="Realm"
                        description="An NFT P2E Metaverse with unique microverses and living NFT pets"
                        totalCapacity="2mln BUSD"
                        followers="12 432"
                        score="👌 9.32/10"
                        access="Public"
                        currentPercent="100%"
                        piece="1 947 355/2 000 000"
                        minPercent="(Min. 52%)"
                        progress={100}
                        image="images/zam-pad/realm-image.svg"
                        currency="images/zam-pad/bnb.svg"
                        headerImage="../../../images/zam-pad/realm.svg" />
                </div>
                <div className="participate">
                    <div className="participate__title">
                        How to Participate
                    </div>
                    <br />
                    <div className="participate__cards">
                        <ParticipateCard
                            number="1."
                            button="Start the KYC"
                            image="images/zam-pad/register.svg"
                            title="Register and KYC"
                            content="In order to participate in sales on Avalaunch, you must register and KYC first. You can still stake and earn ZAM without registering." />

                        <ParticipateCard
                            number="2."
                            button="Verify Wallet"
                            image="images/zam-pad/wallet.svg"
                            title="Verify Wallet"
                            content="Once you have registered and submitted your KYC, you must verify your wallet. This is the only wallet you will be able to use for sales." />

                        <ParticipateCard
                            number="3."
                            button="Stake ZAM"
                            image="images/zam-pad/zam.svg"
                            title="Allocation Staking"
                            content="By staking ZAM, you earn allocation in IDOs. If you do not want to participate in sales, you can still benefit from staking." />

                        <ParticipateCard
                            number="4."
                            button="Register"
                            image="images/zam-pad/sale.svg"
                            title="Register for Sale"
                            content="During the registration period, you must confirm your interest in participation. Once registration closes, you will not be able to register until the next sale." />
                    </div>
                </div>

                <div className="funded-projects">
                    <div className="funded-projects__title">
                        <div>
                            <p className="funded-projects__title__title">Funded Projects</p>
                            <p className="unded-projects__title__description">We bring new technologies to our community</p>
                        </div>
                        <div className="funded-projects__title__buttons">
                            <button className="all-networks-button">
                                All Networks
                            </button>
                            <Button content="BSC" icon="images/zam-pad/bscc.svg" />
                            <Button content="SOL" icon="images/zam-pad/sol.svg" />
                            <Button content="ETH" icon="images/zam-pad/eth.svg" />
                            <Button content="MATIC" icon="images/zam-pad/matic.svg" />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="big-cards-container">
                    <BigCard
                        title="WonderHero"
                        description="Play To Earn Mobile RPG"
                        totalCapacity="200k USDC"
                        followers="12 432"
                        score="👌 9.32/10" access="Public"
                        currentPercent="95%"
                        piece="144 735/200 000"
                        minPercent="(Min. 52%)" progress={80}
                        image="images/zam-pad/epic.png"
                        currency="images/zam-pad/ruble.svg"
                        headerImage="../../../images/zam-pad/wonder-hero.svg" />
                    <BigCard
                        title="Highstreet"
                        description="Shopify on an MMORPG"
                        totalCapacity="3mln USDT"
                        followers="12 432" score="👌 9.32/10"
                        access="Public" currentPercent="65%"
                        piece="1 947 355/3 000 000"
                        minPercent="(Min. 52%)" progress={50}
                        image="images/zam-pad/highstreet-image.svg"
                        currency="images/zam-pad/usd.svg"
                        headerImage="../../../images/zam-pad/highstreet.svg" />
                    <BigCard
                        title="Realm"
                        description="An NFT P2E Metaverse with unique microverses and living NFT pets"
                        totalCapacity="2mln BUSD"
                        followers="12 432"
                        score="👌 9.32/10"
                        access="Public"
                        currentPercent="100%"
                        piece="1 947 355/2 000 000"
                        minPercent="(Min. 52%)"
                        progress={100}
                        image="images/zam-pad/realm-image.svg"
                        currency="images/zam-pad/bnb.svg"
                        headerImage="../../../images/zam-pad/realm.svg" />
                </div>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="more-pools">More Pools</button>
                </div>
                <div className="performance">
                    Performance
                </div>
                <div>
                    <Table />
                </div>
                <br />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="more-pools">More Pools</button>
                </div>
                <div className="nft-title">
                    <div>Mastery Levels</div>
                    <div className="nft-title__description">TrillioHeirs 8 888 Unique NFTs with Utility for ZAMpad and Your Ticket to ZAM.DAO</div>
                </div>
                <div className="nft-actions">
                    <button className="nft-actions__button">Stake ZAM</button>
                    <button className="nft-actions__button">Buy ZAM</button>
                    <button className="nft-actions__nft">Buy NFT</button>
                </div>
                <div className="nft-container">
                    <Nft seedPools="--" withoutNftUp="40" withNftUp="80" circleColor="#FFFFFF" percent="10" zamCount="2" belt="White" badgeContent="1 NFT" icon="images/zam-pad/1lvl.png" lvl="images/zam-pad/first-lvl.svg" />
                    <Nft seedPools="--" withoutNftUp="250" withNftUp="450" circleColor="#FECD08" percent="20" zamCount="10" belt="Yellow" badgeContent="1 NFT" icon="images/zam-pad/2lvl.png" lvl="images/zam-pad/2lvl.svg" />
                    <Nft seedPools="--" withoutNftUp="500" withNftUp="750" circleColor="#FA8003" percent="20" zamCount="30" belt="Orange" badgeContent="1 NFT" icon="images/zam-pad/3lvl.png" lvl="images/zam-pad/3lvl.svg" />
                </div>
                <div className="nft-container">
                    <Nft seedPools="" withoutNftUp="900" withNftUp="1,350" circleColor="#7AE404" percent="12" zamCount="80" belt="Green" badgeContent="2 NFT" icon="images/zam-pad/4lvl.png" lvl="images/zam-pad/4lvl.svg" />
                    <Nft seedPools="--" withoutNftUp="1,600" withNftUp="2,400" circleColor="#1682F6" percent="12" zamCount="160" belt="Blue" badgeContent="3 NFT" icon="images/zam-pad/5lvl.png" lvl="images/zam-pad/5lvl.svg" />
                    <Nft seedPools="--" withoutNftUp="2,800" withNftUp="4,200" circleColor="#6A3A24" percent="10" zamCount="320" belt="Brown" badgeContent="4 NFT" icon="images/zam-pad/6lvl.png" lvl="images/zam-pad/6lvl.svg" />
                </div>
                <div className="nft-container">
                    <Nft seedPools="--" withoutNftUp="4,800" withNftUp="7,200" circleColor="#020202" percent="8" zamCount="500" belt="Black" badgeContent="5 NFT" icon="images/zam-pad/7lvl.png" lvl="images/zam-pad/7lvl.svg" />
                    <Nft seedPools="Private" withoutNftUp="7,000" withNftUp="10,500" circleColor="#F31A12" percent="8" zamCount="800" belt="Red" badgeContent="6 NFT" icon="images/zam-pad/8lvl.png" lvl="images/zam-pad/8lvl.svg" />
                </div>
            </div >
        </>
    )
};