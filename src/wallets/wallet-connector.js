import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import Web3 from "web3";
import {CHAIN_ID_BINANCE, CHAIN_ID_ETH} from "@src/constants";

const RPC_URLS_1 = process.env.RPC_URL_1;
const RPC_URLS_56 = process.env.RPC_URL_56;

export class WalletConnector extends WalletAbstract {
    constructor() {
        super();
        this.type = 'walletconnect';

        this.connector = new WalletConnectConnector({
            rpc: { 1: RPC_URLS_1},
            qrcode: true,
            infuraId: '2b5bedc31cf44e6cb63e5994a8e87761'
        });
    }

    checkConnection = async () => {
        return this.connect();
    }

    connect = async () => {
        this.address = await this.connector.activate().then(response => response.account);
        this.connector.handleDisconnect = () => this.resetWallet();
        this.connector.handleChainChanged = () => window.location.reload();
        console.log(this.connector);


        return this;
    }

    // getProvider = async (chainId = CHAIN_ID_ETH) => {
    //     let rpc = {};
    //     if (chainId === CHAIN_ID_ETH) {
    //         rpc = {1: RPC_URLS_1}
    //     } else if (chainId === CHAIN_ID_BINANCE) {
    //         rpc = {56: RPC_URLS_56}
    //     }
    //     this.connector = new WalletConnectConnector({
    //         rpc,
    //         bridge: "https://bridge.walletconnect.org",
    //         qrcode: true,
    //     });
    //     await this.connector.activate();
    //     return await this.connector.getProvider();
    // }

    getChainId = async () => {
        return await this.connector.getChainId();
    };

    getNetwork = (chainId) => {
        if (chainId === CHAIN_ID_ETH) {
            return RPC_URLS_1;
        } else if (chainId === CHAIN_ID_BINANCE) {
            return RPC_URLS_56;
        }
    }
}
