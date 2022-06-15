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
            rpc: {1: RPC_URLS_1, 56: RPC_URLS_56},
            qrcode: true,
        });
        window.walletconnector = WalletConnectConnector;
    }

    checkConnection = async () => {
        return this.connect();
    }

    connect = async () => {
        this.connector.handleDisconnect = () => this.resetWallet();
        this.connector.handleChainChanged = () => window.location.reload();
        this.address = await this.connector.activate().then(response => response.account)
            .catch(this.resetWallet);


        return this;
    }

    getProvider = async (chainId = CHAIN_ID_ETH) => {
        await this.connector.activate();
        return await this.connector.getProvider();
    }

    getChainId = async () => {
        const connector = await this.connector.activate();
        return Web3.utils.toHex(connector.provider.chainId);
    };

    // getNetwork = (chainId) => {
    //     if (chainId === CHAIN_ID_ETH) {
    //         return process.env.RPC_URL_ETH_ANKR;
    //     } else if (chainId === CHAIN_ID_BSC) {
    //         return process.env.RPC_URL_BSC_ANKR;
    //     }
    // }

    switchNetwork = async (chainId, rpcUrl) => {
        throw new Error(
            'There is no way to switch the network using a Wallet Connect. ' +
            'Please switch the network yourself in your wallet and reconnect.'
        );
    }
}
