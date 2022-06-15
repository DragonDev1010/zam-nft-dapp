import React from "react";
import {WalletFactory} from "@src/wallets/wallet-factory";
import Web3 from "web3";
import {CHAIN_ID_BSC, CHAIN_ID_ETH} from "../constants";


export class WalletAbstract {
    constructor() {
        this.type = '';
        this.address = '';
        this.error = '';
    }

    checkConnection = async () => {
        return this;
    };

    connect = async () => {
        return this;
    };

    resetWallet = () => {
        this.type = '';
        this.address = '';
        localStorage.setItem('walletType', null);
        localStorage.setItem('walletconnect', null);

        return this;
    };

    createFromRequest = (localWallet) => {
        const newWallet = WalletFactory.getWallet(localWallet.type);

        for (const prop of Object.getOwnPropertyNames(localWallet)) {
            if (typeof localWallet[prop] === 'string' || typeof localWallet[prop] === 'number'
                || typeof localWallet[prop] === 'boolean') {
                newWallet[prop] = localWallet[prop];
            }
        }

        return newWallet;
    };

    getNetwork = (chainId) => {
        if (chainId === CHAIN_ID_ETH) {
            return Web3.givenProvider;
        } else if (chainId === CHAIN_ID_BSC) {
            return process.env.RPC_URL_BSC;
        }
    }

    getChainId = async () => {
    };

    getProvider = async () => {
    }

    switchNetwork = async (chainId, rpcUrl) => {
    }
}
