import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '3d-react-carousal';
import { STAGES } from "@src/constants";
import { WalletContext } from "@src/context";
import { OraculaAction } from '../../actions/oraculaAction'
import useWindowSize from '../../hooks/useWindowSize';

import { SLIDES_INFO, PARTICITATES_INFO, SALES_INFO, DETAILED_INFO } from "./info";
import { ParticipateCard } from "./components/participate-card";
import { DetailedCard } from './components/detailed-card';
import { SmallCard } from './components/small-card';
import { FundedProjects } from "./components/funded-projects";
import { Nft } from './components/nft-card';
import { BigCard } from './components/big-card';
import { Table } from './components/table';

export const BodyAlpha = () => {

    const { width } = useWindowSize()
    const { wallet } = useContext(WalletContext);

    const action = new OraculaAction(wallet)
    const mockAllocation = 0

    const [cardData, setCardData] = useState({
        allocationTotal: mockAllocation,
        allocationSold: 0,
        chainId: '',
        startTime: '',
        endTime: ''
    })

    const getOraculaAction = async () => {
        if (!wallet) return

        const sale = await action.getSale();

        if (!sale.isInitialized) return

        const gettedRounds = await action.getRounds()
        const actualStage = await action.getStage()
        const stage = gettedRounds?.length ? actualStage : 5

        setCardData(prevState => ({
            ...prevState,
            stage: STAGES[stage],
            allocationTotal: sale.allocationTotal,
            allocationSold: sale.allocationSold,
            startTime: (actualStage !== 5 && gettedRounds?.length) ? gettedRounds[Number(actualStage)].startTime * 1000 : Date.now(),
            endTime: (actualStage !== 5 && gettedRounds?.length) ? gettedRounds[Number(actualStage)].endTime * 1000 : Date.now(),
        }))
    }

    const getChainId = async () => {
        const chainId = await action.getChainId(wallet)
        setCardData(prevState => ({
            ...prevState,
            chainId
        }))
    }

    useEffect(async () => {
        getOraculaAction()
        getChainId()
    }, [wallet, chainId]);

    const { chainId, allocationTotal, allocationSold, endTime, stage } = cardData

    const endDate = new Date(endTime).toLocaleDateString('en-US', { month: "short", day: "numeric" }) 

    const diffTime = (Number(endTime) - Date.now()) > 0 ? Number(endTime) - Date.now() : 0

    const progress = Math.floor(allocationSold / (Number(allocationTotal) / 100)) || 0

    return (
        <>
            <div className="zam-pad__body-container">
                <div className="zam-pad__body-wrapper">
                    <div className="zam-pad__title">
                        Live and Upcoming Sales
                    </div>
                    <div className="zam-pad__sales-body">
                        <div className="zam-pad__large-card">
                            {DETAILED_INFO.length && DETAILED_INFO.map((item) => 
                               <DetailedCard 
                                    key={item.title}
                                    {...item} 
                                    total={allocationTotal}
                                    stage={stage} 
                                    time={diffTime}
                                    onStopTimer={getOraculaAction}
                            />)}
                        </div>
                        <div className="zam-pad__small-cards">
                            <div className="zam-pad__small-card">
                                <SmallCard modifier="">
                                    <p className="small-card__title">
                                        Staking ZAM Up to
                                        <br />
                                        <span className="small-card__title-span">20% APY</span>
                                    </p>
                                    <Link to="staking" className="small-btn">
                                        Stake $ZAM
                                    </Link>
                                </SmallCard>
                            </div>
                            <div className="zam-pad__small-card">
                                <SmallCard modifier="small-card_green">
                                    <p className="small-card__title">
                                        Buy <span className="small-card__title-span">ZAM </span>and Join
                                        <br />
                                        Our Community
                                    </p>
                                    <a href="https://pancakeswap.finance/swap?outputCurrency=0xBbcF57177D8752B21d080bf30a06CE20aD6333F8" className="small-btn">
                                        Buy $ZAM
                                    </a>
                                </SmallCard>
                            </div>
                        </div>
                    </div>
                    <div className="zam-pad__cards">
                        {SALES_INFO.length && SALES_INFO.map((item) => 
                            <BigCard 
                                {...item} 
                                key={item.title} 
                                stage={stage}
                                allocationTotal={allocationTotal}
                                progress={progress}
                                allocationSold={allocationSold}
                                endDate={endDate}
                        />)}
                    </div>
                    <div className="participate">
                        <div className="participate__title">
                            How to Participate
                        </div>
                        <div className="participate__cards">
                            {PARTICITATES_INFO.length && PARTICITATES_INFO.map((item, index) => <ParticipateCard key={Math.random(index)} {...item} />)}
                        </div>
                    </div>
                    {/* Закомментировать funded-projects перед выпуском в продакшен */}
                    <FundedProjects 
                        stage={stage}
                        allocationTotal={allocationTotal}
                        progress={progress}
                        allocationSold={allocationSold}
                        endDate={endDate}
                    />
                    {/* Закомментировать performance перед выпуском в продакшен */}
                    <div className="performance">
                        <div className="performance__title">Performance</div>
                        <div className="performance__table">
                            <Table />
                        </div>
                        <div className='performance__more-btn'>
                            <Link to="/calendar" className="more-pools">More Pools</Link>
                        </div>
                    </div>

                    <div className="nft-main">
                        <div className="nft-main__head">
                            <div className="nft-main__title">Mastery Levels</div>
                            <div className="nft-main__description">TrillioHeirs 8 888 Unique NFTs with Utility for ZAMpad and Your Ticket to ZAM.DAO</div>
                        </div>
                    </div>
                    <div className="nft-main__actions">
                        <Link to="staking" className="small-btn nft-main__button nft-main__button_grey">Stake $ZAM</Link>
                        <a href="https://pancakeswap.finance/swap?outputCurrency=0xBbcF57177D8752B21d080bf30a06CE20aD6333F8" target="_blank" className="small-btn nft-main__button nft-main__button_grey">Buy $ZAM</a>
                        <Link to="nft" className="small-btn nft-main__button">Buy NFT</Link>
                    </div>
                    <div className="nft-main__carousel nft-carousel">
                        {width > 1199 ? SLIDES_INFO.length && SLIDES_INFO.map(item => <Nft {...item} key={item.lvlNumber} />) : <Carousel slides={SLIDES_INFO.map(item => <Nft {...item} key={item.lvlNumber} />)} arrows={false} autoplay={false} interval={5000} />} 
                    </div>
                </div>
            </div >
        </>
    )
};