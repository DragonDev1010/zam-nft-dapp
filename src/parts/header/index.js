import React, {useState} from 'react';
import {IconAppApple, IconAppGoogle} from "../../icons/icons.js";

const Header = () => {
    return <header className="site-header">
                <div className="site-header__left">
                    <a href="/">
                        <img src="/images/logo_zamio.svg" alt="Zamio"/>
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
                    <button className="button-logout">
                        Log out <img src="/images/icon_logout.svg"/>
                    </button>
                    <button className="button-wallet">
                        Connect Wallet <img src="/images/icon_chain.svg"/>
                    </button>
                    <a href="#">
                        <img src="/images/icon-gear.svg"/>
                    </a>
                </div>

    </header>
}

export default Header;
