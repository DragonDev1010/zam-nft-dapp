import React, {useContext, useEffect, useState} from 'react';
import {IconAppApple, IconAppGoogle} from "../../icons/icons.js";
import {ModalWalletConnect} from "@src/components/modal/wallet-connect";
import {ModalContext, WalletContext} from "@src/context";
import {Modal} from "@src/components/modal/modal";
import {NetworkSwitcher} from "@src/components/network-switcher";

const Header = () => {
    const {setModalWalletOpen} = useContext(ModalContext);
    const {wallet, setWallet, walletError, setWalletError} = useContext(WalletContext);

    return (
        <>
            <header className="site-header">
                <div className="site-header__left">
                    <a href="/">
                        <img src="/images/logo_zamio.svg" className="site-header__logo" alt="Zamio"/>
                    </a>

                    <div className="site-header__center">
                        <nav className="site-header__nav">
                            <ul>
                                <li><a href="https://zam.io/token">$ZAM</a></li>
                                <li><a href="https://zam.io/wallet">ZamWallet</a></li>
                                <li><a href="https://babylon.zam.io/">Babylon</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="site-header__right">
                    {
                        !wallet.address ||
                        <>
                            <NetworkSwitcher wallet={wallet}/>

                            <button className="button-logout hidden-sm" onClick={() => setWallet(wallet.resetWallet())}>
                                Log out <img src="/images/icon_logout.svg"/>
                            </button>
                        </>
                    }

                    <button className={`button-wallet ${wallet.address ? 'button-wallet--connected' : ''}`}
                            onClick={() => setModalWalletOpen(true)}>
                        {
                            wallet.address ? (
                                <>
                                    <span>{`${String(wallet.address).substring(0, 6)}...${String(wallet.address).substring(38)}`}</span>

                                    <div className="button-wallet__icon">
                                        {
                                            wallet.type === 'metamask' ?
                                                <img src="/images/icon_metamask.svg"/> :
                                                wallet.type === 'binance' ?
                                                    <img src="/images/tokens/icon_token_bsc.svg"/> :
                                                    wallet.type === 'walletconnect' ?
                                                        <img src="/images/icon_walletconnector.svg"/> :
                                                        ''

                                        }
                                    </div>

                                </>
                            ) : (
                                <>
                                    <span>Connect Wallet</span> <img className="hidden-sm" src="/images/icon_chain.svg"/>
                                </>

                            )
                        }
                    </button>
                    {/*<a href="#">*/}
                    {/*    <img src="/images/icon-gear.svg" alt=""/>*/}
                    {/*</a>*/}
                </div>

                {
                    !walletError?.length ||
                    <div className="error-dropdown">
                        {[...new Set(walletError)].join("\n")}
                    </div>
                }
            </header>

        </>
    );
};

export default Header;
