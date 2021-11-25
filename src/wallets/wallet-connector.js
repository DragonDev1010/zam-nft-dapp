import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import Web3 from "web3";
import {CHAIN_ID_BSC, CHAIN_ID_ETH} from "@src/constants";

const RPC_URLS_1 = process.env.RPC_URL_ETH_ANKR;
const RPC_URLS_56 = process.env.RPC_URL_BSC_ANKR;

export class WalletConnector extends WalletAbstract {
    constructor() {
        super();
        this.type = 'walletconnect';

        this.connector = new WalletConnectConnector({
            rpc: {1: 'https://mainnet.infura.io/v3/2b5bedc31cf44e6cb63e5994a8e87761'},
            qrcode: true,
            infuraId: '2b5bedc31cf44e6cb63e5994a8e87761'
        });
        window.walletconnector = WalletConnectConnector;


        // this.connector.then(response => console.log(response))
    }

    checkConnection = async () => {
        return this.connect();
    }

    connect = async () => {
        this.connector.handleDisconnect = () => this.resetWallet();
        this.connector.handleChainChanged = () => window.location.reload();
        this.address = await this.connector.activate().then(response => response.account);


        return this;
    }

    getProvider = async (chainId = CHAIN_ID_ETH) => {
        // let rpc = {};
        // if (chainId === CHAIN_ID_ETH) {
        //     rpc = {1: RPC_URLS_1}
        // } else if (chainId === CHAIN_ID_BSC) {
        //     rpc = {56: RPC_URLS_56}
        // }
        // this.connector = new WalletConnectConnector({
        //     rpc,
        //     bridge: "https://bridge.walletconnect.org",
        //     qrcode: true,
        // });
        await this.connector.activate();
        return await this.connector.getProvider();
    }

    getChainId = async () => {
        await this.connector.activate();
        return await this.connector.getChainId();
    };

    getNetwork = (chainId) => {
        if (chainId === CHAIN_ID_ETH) {
            return process.env.RPC_URL_ETH_ANKR;
        } else if (chainId === CHAIN_ID_BSC) {
            return process.env.RPC_URL_BSC_ANKR;
        }
    }
}
