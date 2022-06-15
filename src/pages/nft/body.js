import {TrillioHeirsAction} from "@src/actions/trillioHeirsAction";
import {Button} from "@src/components/buttons/button";
import {ModalContext, WalletContext} from "@src/context";
import React, {useContext, useEffect, useState} from "react";
import {NftCard} from "./nftCard";
import {NFTS_INFO} from "./nftsInfo";
import AliceCarousel from "react-alice-carousel";
import {CHAIN_ID_ETH, NETWORK_ETH, specialList} from "@src/constants";

export const NftBody = () => {
    const {wallet, setWalletError} = useContext(WalletContext);
    const {setModalNetworkOpen} = useContext(ModalContext);
    const {setModalWalletOpen} = useContext(ModalContext);
    const {setMessage} = useContext(ModalContext);

    const responsive = {
        0: {items: 1},
    };

    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState("");
    const [nftAmount, setNftAmount] = useState("");
    const [cost, setCost] = useState(0)
    const [chainId, setChainId] = useState("");
    const [nftAction, setNftAction] = useState(null);
    const [lvl, setLvl] = useState(1)
    const [nftsInfo, setNftsInfo] = useState([]);
    const [sliderItems, setSliderItems] = useState([
        <div className="no-nft-item">
            <img src="../images/nft/allMintedNfts.png" alt=""/>
            <div className="no-nft-item__title">Check your Minted NFTs here!</div>
            <a className="button-outline mt-10" style={{borderColor: "#2DFF82"}} target="_blank"
               href="https://opensea.io/account/">Check NFTs</a>
        </div>,
    ]);
    const getNftAction = async () => {
        if (wallet) {
            const action = new TrillioHeirsAction(wallet, specialList)
            const userBalance = await action.getWalletBalance();
            setBalance(Number(userBalance).toFixed(5));
            setNftAction(action);
            //
            // const userNftsIds = await action.walletOfOwner();
            // setNftsIds(userNftsIds);
        }
    }
    const getChainId = async () => {
        if (nftAction !== null) {
            const chainId_ = await nftAction.getChainId()
            setChainId(parseInt(chainId_))
        }
    }

    const amountInputHandler = (e) => {
        setNftAmount(e.target.value);
        const ratio = 0.18;
        setCost((e.target.value * ratio).toFixed(2));
    }

    const getActiveLevel = (level) => {
        let info = NFTS_INFO.map((item, i, arr) => {
            item.isActive = item.level === level;
            return item;
        });
        setNftsInfo(info);
    };

    const btnMintHandler = async () => {
        if (wallet == null || wallet.address == "") {
            setModalWalletOpen(true);
            return;
        } else {
            const chainId_ = await wallet.getChainId();
            if (chainId_ !== CHAIN_ID_ETH) {
                setModalNetworkOpen(NETWORK_ETH);
                return;
            }
        }

        if (!nftAmount || parseInt(nftAmount) <= 0 || isNaN(parseInt(nftAmount))){
            setMessage({
                message: "Please input how many NFT do you want to buy before Mint NFT",
                isOpen: true,
                success: false,
                title: 'Warning'
            })
            return;
        }
        if (nftAmount) {
            console.log(nftAmount, wallet.address, cost)
            if (balance < cost) {
                setMessage({
                    message: "You don't have enough ETH on balance to buy such amount. You need at least " + cost,
                    isOpen: true,
                    success: false,
                    title: 'Warning'
                })
                return;
            }
            await nftAction.presaleMint(nftAmount, wallet.address, cost)
            setWalletError(nftAction.errorAction);
            setModalNetworkOpen(nftAction.needChainId);
        }
    };

    useEffect(async () => {
        getNftAction()
        getChainId()
    }, [wallet, chainId]);

    useEffect(() => {
        getActiveLevel(lvl.toString())
    }, [lvl])

    return (
        <div className="nft-body">
            <div className="nft-body__cards">
                <div className="info-card">
                    <div className="info-card__header">
                        <div className="info-card__header__title">Public Sale Mint NFT</div>
                        <div className="info-card__header__subtitle">ERC20</div>
                    </div>
                    <div className="info-card__body">
                        <div className="info-card__body__info">
                            <div className="info-card__body__info__number">
                                Number of NFTs: <span/>
                            </div>
                            <div className="info-card__body__info__number">
                                Balance: <span>{balance} ETH</span>
                            </div>
                        </div>

                        <div className="info-card__body__input">
                            <div className="input-field mt-10">
                                <div className="input-field__column">
                                    <input
                                        className="input-field__input "
                                        value={nftAmount}
                                        onChange={amountInputHandler}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="input-field__column ">
                                    <div className="nft-input__currency">{cost} ETH</div>
                                </div>
                            </div>
                        </div>
                        <Button title="Mint NFT" onClick={btnMintHandler}/>
                    </div>
                </div>
                <div className="info-card">
                    <div className="info-card__header">
                        <div className="info-card__header__title small">Available to You:</div>
                    </div>
                    <div className="info-card__body">
                        <div className="info-card__body__staking">
                            <div className="info-card__body__staking__title">Random 1-3 <br/>Level NFT</div>
                        </div>
                    </div>
                </div>
                <div className="info-card nfts-card">
                    <div className="info-card__header nfts-header">
                        <div className="info-card__header__title nfts">
                            <div className="info-card__header__title__all">
                                <img src="../images/nft/myNftsLogo.png" alt=""/> My NFTs
                            </div>
                            <div className="info-card__header__title__amount">
                                {/*{nftsIds !== undefined ? nftsIds.length : 0} NFTs*/}
                            </div>
                        </div>
                    </div>
                    <div className="info-card__body nfts">
                        <div className="info-card__body__slider">
                            {isLoading && <div className="info-card__body__slider__loader">Loading...</div>}
                            {!isLoading &&
                            <AliceCarousel infinite responsive={responsive} mouseTracking items={sliderItems}/>}
                            {/*{!isLoading && sliderItems.map(image => (*/}
                            {/*    <div className="nft-item">*/}
                            {/*      <a href={image} target="_blank">{image}</a>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="nft-body__nfts">
                <div className="nft-body__nfts__title">
                    <h2>Rarity Levels</h2>
                </div>
                <div className="nft-body__nfts__cards">
                    {nftsInfo.map((item, i) => (
                        <NftCard {...item} key={i}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
