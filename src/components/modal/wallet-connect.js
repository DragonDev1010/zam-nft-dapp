import React, {useEffect, useState, useContext} from 'react';
import {WalletContext} from "@src/context";

import {WalletFactory} from "@src/wallets/wallet-factory";
import WalletAdress from '../wallet-adress';

import { IconCheckMark } from "@src/icons/icons";

export const ModalWalletConnect = (props) => {
    const {wallet, setWallet, setWalletError} = useContext(WalletContext);
    const [agreement, setAgreement] = useState(wallet?.address !== '');
    const [hasNotMetamask, setHasNotMetamask] = useState(false);
    const [hasNotBinance, setHasNotBinance] = useState(false);

    useEffect(() => {
        setAgreement(wallet.address !== '');
    }, [wallet.address]);

    const connectWallet = async (type) => {
        setHasNotMetamask(false);
        setHasNotBinance(false);

        if (!agreement) {
            return false;
        }

        if (type === 'metamask' && !window.ethereum) {
            setHasNotMetamask(true);
            return false;
        }
        if (type === 'binance' && !window.BinanceChain) {
            setHasNotBinance(true);
            return false;
        }

        wallet.resetWallet();

        const walletConnector = WalletFactory.getWallet(type);
        await walletConnector.connect();

        if (walletConnector.address) {
            setWallet(walletConnector);
            setWalletError(null);

            props.onClose();
        }
    };

    return (
        <div className="modal__wallet">
            {wallet.address ?  
            <>
                <h4 className="mb-20">Wallet Management</h4>
                <WalletAdress />
            </> : <h4>Connect Wallet</h4>}
            
            <p className="label">
                1. Accept Terms and Conditions and Privacy Policy
            </p>

            <label className="modal__wallet-agreement">
                <div className="checkbox">
                    <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)}/>
                    <IconCheckMark/>
                </div>
                <div className="checkbox-label">By using zam.io you agree to our <a
                    href="https://zam.io/docs/debe5b38c66e212ac7afddf8293af433.pdf" target="_blank">
                    Terms and Conditions</a> along with our <a
                    href="https://zam.io/docs/5e7b377cde8403176232a4cff7b679b4.pdf" target="_blank">Privacy
                    Policy</a> and any other applicable documents.
                </div>
            </label>

            <p className="label">
                2. Choose Wallet
            </p>

            <div className="modal__wallet--wallets">
                <div
                    className={`wallet ${agreement ? 'active' : ''} ${wallet.type === 'metamask' && wallet.address ? 'current' : ''}`}
                    onClick={() => connectWallet('metamask')}>
                    <img src="./images/icon_metamask.svg" alt="wallet"/>
                    <span className="wallet__name">Metamask</span>
                </div>
                <div
                    className={`wallet ${agreement ? 'active' : ''} ${wallet.type === 'binance' && wallet.address ? 'current' : ''}`}
                    onClick={() => connectWallet('binance')}>
                    <img src="./images/tokens/icon_token_bsc.svg" alt="wallet"/>
                    <span className="wallet__name">Binance Wallet</span>
                </div>
                <div
                    className={`wallet ${agreement ? 'active' : ''} ${wallet.type === 'walletconnect' && wallet.address ? 'current' : ''}`}
                    onClick={() => connectWallet('walletconnect')}>
                    <img src="./images/icon_walletconnector.svg" alt="wallet"/>
                    <span className="wallet__name">Wallet Connect</span>
                </div>
            </div>

            {
                hasNotMetamask &&
                <div className="modal__wallet--error">
                    Please install <a target='_blank' href={`https://metamask.io/download.html`}>Metamask</a> extension
                    to your browser.
                </div>
            }
            {
                hasNotBinance &&
                <div className="modal__wallet--error">
                    Please install <a target='_blank'
                                      href={`https://www.binance.org/en/blog/binance-extension-wallet/`}>Binance Chain
                    Wallet</a> extension to your browser.
                </div>
            }

        </div>
    );
}
