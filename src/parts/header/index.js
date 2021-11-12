import React, {useContext, useEffect, useState} from 'react';
import {IconAppApple, IconAppGoogle} from "../../icons/icons.js";
import {ModalWalletConnect} from "@src/components/modal/wallet-connect";
import {ModalWalletContext, WalletContext} from "@src/context";

const Header = () => {
    const {modalIsOpen, setModalOpen} = useContext(ModalWalletContext);
    const {wallet, setWallet, walletError, setWalletError} = useContext(WalletContext);

    return (
        <>
            <header className="site-header">
                <div className="site-header__left">
                    <a href="/">
                        <img src="images/logo_zamio.svg" alt="Zamio"/>
                    </a>
                </div>
                <div className="site-header__center">
                    <nav className="site-header__nav">
                        <ul>
                            <li><a href="https://docs.zam.io/ecosystem/zmorgan">zMorgan</a></li>
                            <li><a href="https://zam.io/token">$ZAM</a></li>
                            <li><a href="https://zam.io/wallet">ZamWallet</a></li>
                            <li><a href="https://docs.zam.io/">Docs</a></li>
                            <li><a href="https://babylon.zam.io/">Babylon</a></li>
                            <li><a href="https://zam.io/contacts">Contacts</a></li>
                            <li>
                                <a href="https://apps.apple.com/ru/app/zam-wallet/id1436344249" target="_blank"
                                   className="nav-app nav-app--apple">
                                    <IconAppApple/>
                                </a>
                            </li>
                            <li>
                                <a href="https://play.google.com/store/apps/details?id=zam.wallet" target="_blank"
                                   className="nav-app">
                                    <IconAppGoogle/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="site-header__right">
                    {
                        !wallet.address ||
                        <button className="button-logout" onClick={() => setWallet(wallet.resetWallet())}>
                            Log out <img src="images/icon_logout.svg"/>
                        </button>
                    }

                    <button className="button-wallet" onClick={() => setModalOpen(true)}>
                        {
                            wallet.address ? (
                                <>
                                    <span>{`${String(wallet.address).substring(0, 6)}...${String(wallet.address).substring(38)}`}</span>
                                    <img src="images/icon_wallet.svg"/>
                                </>
                            ) : (
                                <>
                                    <span>Connect Wallet</span> <img src="images/icon_chain.svg"/>
                                </>

                            )
                        }
                    </button>
                    <a href="#">
                        <img src="images/icon-gear.svg" alt=""/>
                    </a>
                </div>

                {
                    !walletError ||
                        <div className="error-dropdown">
                            {walletError}
                        </div>
                }
            </header>
            <ModalWalletConnect isOpen={modalIsOpen} onClose={() => setModalOpen(false)}/>
        </>
    );
};

export default Header;
