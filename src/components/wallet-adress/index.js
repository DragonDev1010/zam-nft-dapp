import React, { useContext } from 'react';
import {WalletContext} from "@src/context";

import useWindowSize from "@src/hooks/useWindowSize";

export default function WalletAdress() {
    const { wallet, setWallet } = useContext(WalletContext);
    const { width } = useWindowSize();

    return (
        <div className="profile-card__wallet-address">
            <div className="profile-card__wallet-title">
            <div className="button-wallet__icon">
                {wallet.type === "metamask" ? (
                <img src="./images/icon_metamask.svg" />
                ) : wallet.type === "binance" ? (
                <img src="./images/tokens/icon_token_bsc.svg" />
                ) : wallet.type === "walletconnect" ? (
                <img src="./images/icon_walletconnector.svg" />
                ) : (
                ""
                )}
            </div>
            <span className="profile-card__wallet-title-text">
                {width < 460 ? (`${String(wallet.address).substring(0, 5)}...${String(wallet.address).substring(40)}`) 
                :  width > 650 ? (wallet.address)
                : `${String(wallet.address).substring(0, 5)}...${String(wallet.address).substring(30)}`}
            </span>
            <button 
                className="profile-card__copy"
                onClick={() => {wallet.address && navigator.clipboard.writeText(wallet.address)}}
            > 
                <img className="profile-card__copy-icon" src="./images/profile/copy-img.png" />
            </button>
            </div>
            <div className="profile-card__disconnect">
            <img className="profile-card__disconnect-icon" src="./images/profile/disconnect-img.png" />
            <span className="profile-card__disconnect-text" onClick={() => setWallet(wallet.resetWallet())}>Disconnect</span>
            </div>
        </div>
    )
}
