import { NftAction } from "@src/actions/nftAction";
import { Button } from "@src/components/buttons/button";
import { WalletContext } from "@src/context";
import React, { useContext, useEffect, useState } from "react";
import { NftCard } from "./nftCard";
import { NFTS_INFO } from "./nftsInfo";
import Web3 from "web3";
import AliceCarousel from "react-alice-carousel";
import { StakingAction } from "@src/actions/stakingAction";
import { useHistory } from "react-router-dom";

export const NftBody = () => {
  const history = useHistory();

  const btnLevelUpHandler = () => {
    history.push("/staking");
  };

  const responsive = {
    0: { items: 1 },
  };

  const handleDragStart = (e) => e.preventDefault();

  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [firstLevel, setFirstLevel] = useState(false);
  const [secondLevel, setSecondLevel] = useState(false);
  const [thirdLevel, setThirdLevel] = useState(false);
  const [balance, setBalance] = useState("");
  const [nftAmount, setNftAmount] = useState("");
  const [nftPriceCoef, setNftPriceCoef] = useState(0.18);
  const [nftPrice, setNftPrice] = useState("");
  const [staked, setStaked] = useState("");
  const [chainId, setChainId] = useState("");
  const [nftAction, setNftAction] = useState(null);
  const [stakeAction, setStakeAction] = useState(null);
  const [nftsIds, setNftsIds] = useState([]);
  const [nftsInfo, setNftsInfo] = useState([]);
  const [sliderItems, setSliderItems] = useState([
    <div className="no-nft-item">
      <img src="../images/nft/allMintedNfts.png" alt="" />
      <div className="no-nft-item__title">Your Minted NFTs will Appear Here!</div>
    </div>,
  ]);

  const { wallet, walletError, setWalletError } = useContext(WalletContext);

  useEffect(async () => {
    const nft = new NftAction(wallet);
    const stake = new StakingAction(wallet);
    setNftAction(nft);
    setStakeAction(stake);
    const chainIdInHex = await nftAction.getChainId();
    setChainId(Web3.utils.hexToNumber(chainIdInHex));
  }, [wallet]);

  useEffect(async () => {
    if (wallet && chainId === 80001) {
      const isAccountInWhitelist = await nftAction.getWhiteListed();
      const userBalance = await nftAction.getWalletBalance();
      const userNftsIds = await nftAction.walletOfOwner();
      const getSecondLevel = await nftAction.getSecondLevel();
      const getThirdLevel = await nftAction.getThirdLevel();
      setSecondLevel(getSecondLevel);
      setThirdLevel(getThirdLevel);
      setBalance(Number(userBalance).toFixed(5));
      setIsWhiteListed(isAccountInWhitelist);
      setNftsIds(userNftsIds);
      const staked = await stakeAction.getStaked();
      setStaked(staked);
    }
  }, [wallet, chainId]);

  const getActiveLevel = (arr, level) => {
    let info = arr.map((item, i, arr) => {
      if (item.level === level) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    setNftsInfo(info);
  };

  useEffect(() => {
    if (thirdLevel) {
      getActiveLevel(NFTS_INFO, "3");
    } else if (secondLevel) {
      getActiveLevel(NFTS_INFO, "2");
    } else if (!thirdLevel && !secondLevel) {
      getActiveLevel(NFTS_INFO, "1");
    }
  }, [secondLevel, thirdLevel]);

  useEffect(async () => {
    if (nftsIds && nftsIds.length > 0 && chainId === 80001) {
      setIsLoading(true);
      setSliderItems([]);
      let arr = [];
      for (const id of nftsIds) {
        const nftMetadata = await nftAction.tokenURI(+id);
        const response = await fetch("https://cors-proxy-back.herokuapp.com/nfts?url=" + nftMetadata);
        const res = await response.json();
        if (res.image) {
          arr.push(
            <div className="nft-item">
              <img src={res.image} alt="" />
            </div>
          );
        }
      }
      setIsLoading(false);
      setSliderItems(arr);
    }
  }, [nftsIds]);

  useEffect(() => {
    if (isWhiteListed) {
      setNftPriceCoef(0.15);
    } else setNftPrice(0.18);
  }, [isWhiteListed]);

  useEffect(() => {
    if (nftAmount) {
      let priceOfNft = +nftAmount * nftPriceCoef;
      setNftPrice(priceOfNft);
    } else setNftPrice(nftPriceCoef);
  }, [nftAmount, nftPriceCoef]);

  const btnMintHandler = async () => {
    if (chainId !== 80001) return;
    if (nftAmount) {
      await nftAction.mintNft(+nftAmount);
      const userNftsIds = await nftAction.walletOfOwner();
      setNftsIds(userNftsIds);
    }
  };

  return (
    <div className="nft-body">
      <div className="nft-body__cards">
        <div className="info-card">
          <div className="info-card__header">
            <div className="info-card__header__title">Mint NFT</div>
            <div className="info-card__header__subtitle">ERC20</div>
          </div>
          <div className="info-card__body">
            <div className="info-card__body__info">
              <div className="info-card__body__info__number">
                Number of NFTs: <span></span>
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
                    onChange={(e) => setNftAmount(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="input-field__column ">
                  <div className="nft-input__currency">{nftPrice} ETH</div>
                </div>
              </div>
            </div>
            <Button title="Mint 1 NFT" onClick={btnMintHandler} />
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__header">
            <div className="info-card__header__title small">Available to You:</div>
          </div>
          <div className="info-card__body">
            <div className="info-card__body__staking">
              <div className="info-card__body__staking__title">2 Level NFT</div>
              <div className="info-card__body__staking__staked">Staked ZAM:</div>
              <div className="info-card__body__staking__amount">
                <span>{staked}</span> ZAM
              </div>
            </div>
            <Button title="Level Up" onClick={btnLevelUpHandler} />
          </div>
        </div>
        <div className="info-card nfts-card">
          <div className="info-card__header nfts-header">
            <div className="info-card__header__title nfts">
              <div className="info-card__header__title__all">
                <img src="../images/nft/myNftsLogo.png" alt="" /> My NFTs
              </div>
              <div className="info-card__header__title__amount">{nftsIds.length} NFTs</div>
            </div>
          </div>
          <div className="info-card__body nfts">
            <div className="info-card__body__slider">
              {isLoading && <div className="info-card__body__slider__loader">Loading...</div>}
              {!isLoading && <AliceCarousel infinite responsive={responsive} mouseTracking items={sliderItems} />}
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
            <NftCard {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
