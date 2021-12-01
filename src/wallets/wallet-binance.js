import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {CHAIN_ID_BSC, CHAIN_ID_ETH} from "@src/constants";

const RPC_URLS_56 = process.env.RPC_URL_56;

export class WalletBinance extends WalletAbstract {
    constructor() {
        super();
        this.type = 'binance';
        this.network = RPC_URLS_56;
    }

    checkConnection = async () => {
        await this.connectWallet();
        return this;
    }

    connect = async () => {
        await this.connectWallet();
        return this;
    }

    connectWallet = async () => {
        if (window.BinanceChain) {
            try {
                const addressArray = await window.BinanceChain.send('eth_accounts');

                if (!addressArray?.result.length) {
                    return;
                }

                this.address = addressArray.result[0];
            } catch (err) {
                this.error = err.message;
                this.resetWallet();
            }
        } else {
            this.error = (
                <span>
                    Please install <a target='_blank'
                                      href={`https://www.binance.org/en/blog/binance-extension-wallet/`}>Binance Chain
                    Wallet</a> extension to your browser.
                </span>
            )
        }
    }

    getChainId = async () => {
        const response = await window.BinanceChain.send('eth_chainId');
        return response?.result;
    };


    getProvider = async () => {
        return window.BinanceChain;
    }

    switchNetwork = async (chainId, rpcUrl) => {
        const provider = await this.getProvider();

        const chainMap = {
            [CHAIN_ID_ETH]: 'eth-mainnet',
            [CHAIN_ID_BSC]: 'bsc-mainnet',
        }

        try {
            await provider.switchNetwork(chainMap[chainId]);
        } catch (switchError) {
            throw new Error(
                'There is no way to add the new network using a Binance Chain Wallet. ' +
                'Please add the network yourself in your wallet.'
            );
        }
    }
}
