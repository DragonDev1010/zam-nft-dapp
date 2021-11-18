import React from "react";
import {WalletFactory} from "@src/wallets/wallet-factory";


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
