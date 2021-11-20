import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";

const RPC_URLS_56 = process.env.RPC_URL_56;

export class WalletBinance extends WalletAbstract {
    constructor() {
        super();
        this.type = 'binance';
        this.network = RPC_URLS_1;
    }

    checkConnection = async () => {
        await this.query();
        return this;
    }

    connect = async () => {
        await this.query();
        return this;
    }

    async query() {
        if (window.BinanceChain) {
            try {
                const addressArray = await window.BinanceChain.send('eth_accounts');

                if (!addressArray?.result.length) {
                    return;
                }

                this.address = addressArray.result[0];
            } catch (err) {
                this.error = err.message;
            }
        } else {
            this.error = (
                <span>
                    Please install <a target='_blank'
                                      href={`https://www.binance.org/en/blog/binance-extension-wallet/`}>Binance Chain Wallet</a>,
                    a virtual Wallet for Binance Chain, in your browser.
                </span>
            )
        }
    }

    getChainId = async () => {
        return await window.BinanceChain.send('eth_chainId').result;
    };


    getProvider = async () => {
        return window.BinanceChain;
    }
}
