import React, { useContext, useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import { OraculaAction } from '@src/actions/oraculaAction'
import { ModalContext, WalletContext } from "@src/context";
import { BELTS } from "@src/constants";
import { StakingAction } from '@src/actions/stakingAction';

import { ARTICLES_INFO, ROUNDS_INFO, TOKENS_INFO, ORACULA_INFO } from "./info";

import { Head } from "./components/head";
import { TokenCard } from './components/tokenCard';
import { Article } from "./components/article";
import { TokenInfo } from "./components/tokenInfo";
import { Round1 } from "./components/round1";
import { Prepare } from "./components/prepare";
import { Whitelist } from "./components/whitelist";
import { Round2 } from "./components/round2";
import { Distribution } from "./components/distribution";
import { FinalStage } from "./components/final-stage";
import { InfoCard } from './components/InfoCard';
import { Followers } from './components/followers';
import { IDOInfo } from './components/idoInfo.js';


export const Body = () => {
    const { setMessage, setModalWalletOpen } = useContext(ModalContext);
    const { wallet } = useContext(WalletContext);
    const action = new OraculaAction(wallet)
    const stakeAction = new StakingAction(wallet);
    const mockAllocation = 0;
    const [saleIsFinished, setSaleIsFinished] = useState(false)
    const [rounds, setRounds] = useState([...ROUNDS_INFO])
    const [oraculaData, setOraculaData] = useState({
        stage: '',
        allocationTotal: '0',
        allocationSold: '0',
        nft: '0',
        belt: 0,
        startTime: '',
        endTime: '',
        paused: false
    });

    const [info, setInfo] = useState([])

    const [round2Number, setRound2Number] = useState('');

    const [participants, setParticipants] = useState(0)

    const handleInitialData = async () => {
        const actualStage = await action.getStage()
        const sale = await action.getSale();
        const user = await action.registeredUser(wallet)
        const nft = await action.getNftCount(wallet)
        const gettedRounds = await action.getRounds()
        const number = await action.getRegisteredUsersCount()
        const pool = await action.getPool(user.belt)
        const paused = await action.isPaused();
        const staked = await stakeAction.getStaked();
        const balance = await stakeAction.getBalance();
        const tokens = await action.getTokenBalance(wallet)
        const walletBalance = await action.getWalletBalance(wallet)

        const pools = await action.getPools();

        setParticipants(number)

        const maxAllocation = nft > 0 ? pool.maxAllocationGuaranteedWithNft : pool.maxAllocationGuaranteedWithoutNft

        const stage = gettedRounds?.length ? actualStage : 5

        if (sale.isInitialized) {
            setOraculaData(prevState => ({
                ...prevState,
                stage,
                allocationTotal: sale.allocationTotal,
                allocationSold: sale.allocationSold,
                nft,
                belt: user.belt,
                startTime: (actualStage !== 5 && gettedRounds?.length) ? gettedRounds[stage].startTime * 1000 : Date.now(),
                endTime: (actualStage !== 5 && gettedRounds?.length) ? gettedRounds[stage].endTime * 1000 : Date.now(),
                maxAllocation,
                paused,
                allocationBoughtAtRound1: user.allocationBoughtAtRound1,
                allocationBoughtAtRound2: user.allocationBoughtAtRound2,
                tokens,
                pools,
                disabledButtonWhitelist: Number(user.stakedZAM) > 0 ? true : false,
                disabledButtonRoundOne: Number(user.allocationBoughtAtRound1) > 0 ? true : false,
                walletBalance
            }))
        } else {
            setCardData(prevState => ({
                ...prevState,
                stage: 5,
                allocationTotal: mockAllocation,
                allocationSold: 0,
                paused: false
            }))
        }

        setRounds(rounds => rounds.map((item, index) => {
            if (index === stage) {
                item.isActive = true
            } else {
                item.isActive = false
            }
            //for Debug purpose only
            /*            if (index === Number(1)) {
                            item.isActive = true
                        } else {
                            item.isActive = false
                        }*/

            return item
        }))

        const activeRound = rounds[stage]?.title || null
        //for Debug purpose only
        //const activeRound = rounds[Number(1)]?.title || null

        if (activeRound) {
            setInfoArr(activeRound, {
                nft: nft, allocationBoughtAtRound1: user.allocationBoughtAtRound1,
                allocationBoughtAtRound2: user.allocationBoughtAtRound2, tokens, staked, balance, pools
            })
        }
    }

    const handleJoin = async () => {
        try {
            const user = await action.joinWhitelist(wallet)
            handleInitialData()

            setMessage({
                message: `Your belt is: ${user.belt + 1} ${BELTS[user.belt]}. ${oraculaData.nft ? `You have ${oraculaData.nft} NFT` : ``}`,
                isOpen: true,
                success: true,
                title: 'Congratulations! You have successfully joined to whitelist.'
            })
        } catch (e) {
            setMessage({
                message: e,
                isOpen: true,
                success: false,
                title: 'Pleas check, that you have connected you wallet on site and choose BSC network in it.'
            })
        }
    }

    const soldAlloc = Number(oraculaData.allocationSold).toFixed(2)

    const yourAlloc = Number(oraculaData.maxAllocation).toFixed(2)

    const errorHandlers = (tokenBalace, allocation, walletBalance) => {
        if (Number(tokenBalace) >= Number(allocation)) {
            setMessage({
                message: "You don't have enough USDT to buy your allocation. Please add more USDT to your wallet and try again",
                isOpen: true,
                success: false,
                title: 'Warning'
            })

            return
        }

        if (Number(walletBalance) < 0.001) {
            setMessage({
                message: "You don't have enough BNB to confirm transactions. Please add more BNB to your wallet and try again",
                isOpen: true,
                success: false,
                title: 'Warning'
            })

            return
        }
    }

    const verifyWallet = async () => {
        if (!wallet?.address) return

        try {
            const response = await action.verifyWallet(wallet)

            if (!response) throw new Error()

            setMessage({
                message: "Your wallet have successfully verified",
                isOpen: true,
                success: true,
                title: 'Success!'
            })
        } catch (e) {
            setMessage({
                message: e,
                isOpen: true,
                success: false,
                title: 'Your wallet have not been verified!'
            })
        }
    }

    const buyRoundTwoHandler = async (num) => {
        errorHandlers(oraculaData.tokens, num, oraculaData.walletBalance)

        try {
            await action.participate(wallet, Number(num))
            await handleInitialData()

            setMessage({
                message: `Your bought allocation is: ${num} $`,
                isOpen: true,
                success: true,
                title: 'Congratulations! You have successfully participated in Round 2.'
            })
        } catch (e) {
            setMessage({
                message: e,
                isOpen: true,
                success: false,
                title: 'There is error while byuing allocation. Pleas check, that you have connected you wallet on site and choose BSC network in it.'
            })
        }
    }

    const roundOneHandler = async () => {
        errorHandlers(oraculaData.tokens, oraculaData.maxAllocation, oraculaData.walletBalance)

        try {
            await action.participate(wallet, oraculaData.maxAllocation)
            await handleInitialData()

            setMessage({
                message: `Your bought allocation is: ${yourAlloc} $`,
                isOpen: true,
                success: true,
                title: 'Congratulations! You have successfully participated in Round 1'
            })
        } catch (e) {
            setMessage({
                message: e,
                isOpen: true,
                success: false,
                title: 'There is error while byuing allocation. Pleas check, that you have connected you wallet on site and choose BSC network in it.'
            })
        }
    }

    const setInfoArr = (title, data) => {
        const { staked, balance, nft, allocationBoughtAtRound1, allocationBoughtAtRound2, tokens, pools } = data

        const arrPools = pools.map((item, index) => {
            return { number: index + 1, beltName: BELTS[index], zamToStake: item.minStakedZAM }
        })

        const cases = {
            "Preparation": [{ key: "ZAM in wallet", value: balance?.balance },
            { key: "ZAM in staking", value: staked },
            { key: "nft", value: nft }, { key: "USDT in wallet", value: Number(tokens).toFixed(2) }],
            "Whitelist": [{ key: "ZAM in wallet", value: balance?.balance },
            { key: "ZAM in staking", value: staked },
            { key: "nft", value: nft }, { key: "USDT in wallet", value: Number(tokens).toFixed(2) },
            { key: "pools information", value: arrPools }],
            "Round 1": [{ key: "You bought at Round1", value: allocationBoughtAtRound1 }, { key: "USDT in wallet", value: Number(tokens).toFixed(2) }],
            "Round 2": [{ key: "You bought at Round1", value: allocationBoughtAtRound1 }, { key: "You bought at Round2", value: allocationBoughtAtRound2 },
            { key: "USDT in wallet", value: Number(tokens).toFixed(2) }],
            "Distribution and Claim": [{ key: "You bought at Round1", value: allocationBoughtAtRound1 }, { key: "You bought at Round2", value: allocationBoughtAtRound2 },
            { key: "USDT in wallet", value: Number(tokens).toFixed(2) }],
        }

        const arr = cases[title]

        if (!arr?.length) {
            setInfo([])
            return
        }

        setInfo(arr)
    }

    const CurrentCard = ({ title, ...props }) => {
        switch (title) {
            case "Preparation":
                return <Prepare {...props} verifyWallet={verifyWallet} />
            case "Whitelist":
                return <Whitelist {...props} level={oraculaData.belt + 1} beltColor={BELTS[oraculaData.belt]}
                    handleJoin={handleJoin} participants={participants} nftCount={oraculaData.nft} disabledButton={oraculaData.disabledButtonWhitelist} />
            case "Round 1":
                return <Round1 {...props} level={oraculaData.belt + 1} roundOneHandler={roundOneHandler}
                    beltColor={BELTS[oraculaData.belt]} soldAlloc={soldAlloc} yourAlloc={yourAlloc}
                    nftCount={oraculaData.nft} pauseState={oraculaData.paused} disabledButton={oraculaData.disabledButtonRoundOne} />
            case "Round 2":
                return <Round2 {...props} level={oraculaData.belt + 1} buyHandler={buyRoundTwoHandler}
                    beltColor={BELTS[oraculaData.belt]} soldAlloc={soldAlloc} yourAlloc={yourAlloc}
                    nftCount={oraculaData.nft} pauseState={oraculaData.paused} round2Number={round2Number}
                    setRound2Number={setRound2Number} />
            case "Distribution and Claim":
                return <Distribution {...props} level={oraculaData.belt + 1} beltColor={BELTS[oraculaData.belt]}
                    soldAlloc={soldAlloc} yourAlloc={yourAlloc} nftCount={oraculaData.nft} />
        }
    }

    const CurrentRound = () => {
        if (typeof oraculaData.stage !== 'number') return <></>

        const activeRound = rounds[oraculaData.stage]

        //for Debug purpose only

        if (oraculaData.stage === 5) {
            return <FinalStage level={oraculaData.belt + 1} beltColor={BELTS[oraculaData.belt]} nftCount={oraculaData.nft} soldAlloc={soldAlloc} />
        }

        if (!activeRound) return <></>

        const { title, stage } = activeRound

        return <CurrentCard title={title} {...stage} />
    }

    useEffect(() => {
        handleInitialData()
    }, [])

    useEffect(() => {
        handleInitialData()
    }, [wallet.address])

    const getFinishStatus = async () => {
        const gettedRounds = await action.getRounds()
        const endedDate = +gettedRounds[4].endTime * 1000
        const finishStatus = endedDate - Date.now()

        finishStatus <= 0 ? setSaleIsFinished(true) : setSaleIsFinished(false)
    }
    getFinishStatus()

    return (
        <>
            <div className="highstreet-body">
                <Head {...ORACULA_INFO} />
                <div className="highstreet-body__cards">
                    <div className="highstreet-body__cards-left">
                        <TokenCard oraculaData={oraculaData} handleInitialData={handleInitialData} setModalWalletOpen={setModalWalletOpen} rounds={rounds} handleJoin={handleJoin} roundOneHandler={roundOneHandler} buyRoundTwoHandler={buyRoundTwoHandler} round2Number={round2Number} />
                        {/* Закомментировать token-followers перед выпуском в продакшен */}
                        <Followers />
                    </div>
                    <div className="highstreet-body__cards-right">
                        <div className="token-info">
                            <div className="token-info__head">Key Token Metrics:</div>
                            <div className="token-info__content">
                                {TOKENS_INFO.length && TOKENS_INFO.map(({ title, subtitle, imgUrl, currency }, index) => (
                                    <TokenInfo key={Math.random(index)} title={title} subtitle={subtitle}
                                        imgUrl={imgUrl} currency={currency} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="highstreet-body__information">
                    { saleIsFinished && 
                        <div className="highstreet-body__ido-info">
                            <IDOInfo />
                        </div> 
                    }
                    <div className="highstreet-body__profile-rank">
                        <div className="highstreet-body__profile-rank-wrapper">
                            <div className="highstreet-body__profile-rank-content custom-scroll">
                                <CurrentRound />
                                <InfoCard info={info} />
                            </div>
                        </div>
                    </div>
                    <div className="highstreet-body__information-tabs">
                        <div className="highstreet-body__information-tabs-content custom-scroll">
                            {ARTICLES_INFO.length && ARTICLES_INFO.map(({ title }, i) => (
                                <Link
                                    activeClass="activeTitle"
                                    to={title}
                                    spy={true}
                                    smooth={true}
                                    offset={-50}
                                    duration={500}
                                    key={Math.random(i)}
                                    className="highstreet-body__information-tabs-title"
                                    >
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="highstreet-body__information-articles">
                        {ARTICLES_INFO.length && ARTICLES_INFO.map(({ title, description, imgUrl }, index) => (
                            <Article key={Math.random(index)} title={title} description={description} imgUrl={imgUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
