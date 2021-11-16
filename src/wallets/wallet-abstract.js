import React from "react";
import contractZamEthAbi from '@src/contracts/bridge/zam_eth.json';
import contractEthAgentAbi from '@src/contracts/bridge/eth_agent.json';
import contractZamBscAbi from '@src/contracts/bridge/zam_bsc.json';
import contractBscAgentAbi from '@src/contracts/bridge/bsc_agent.json';

import {
    contractZamEthAddress,
    contractEthAgentAddress,
    contractZamBscAddress,
    contractBscAgentAddress, etherScanApiKey
} from '@src/config';
import Web3 from "web3";
import {WalletFactory} from "@src/wallets/wallet-factory";
import {dec2hex} from "@src/utils";


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

}
