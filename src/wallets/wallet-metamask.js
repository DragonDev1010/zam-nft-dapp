import Web3 from "web3";
import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {dec2hex} from "@src/utils";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {CHAIN_ID_ETH, CHAIN_ID_BSC} from "@src/constants";

const RPC_URLS_56 = process.env.RPC_URL_56;

export class WalletMetamask extends WalletAbstract {
    constructor() {
        super();
        this.type = 'metamask';
    }

    checkConnection = async () => {
        await this.connectWallet('eth_accounts');
        return this;
    }

    connect = async () => {
        await this.connectWallet('eth_requestAccounts');
        return this;
    }

    connectWallet = async (method) => {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({method});

                if (!addressArray.length) {
                    return;
                }
                this.address = addressArray[0];
            } catch (err) {
                this.error = err.message;
                this.resetWallet();
            }
        } else {
            this.error = (
                <span>
                    Please install <a target='_blank' href={`https://metamask.io/download.html`}>Metamask</a> extension
                    to your browser.
                </span>
            )
        }
    }

    getChainId = async () => {
        return await window.ethereum.request({method: 'eth_chainId'});
    };

    getProvider = async () => {
        return window.ethereum;
    }

    switchNetwork = async (chainId, rpcUrl) => {
        const provider = await this.getProvider();

        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.

            if (switchError.code === 4902 || switchError.code === -32603 && chainId === '0x38') {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x38',
                            chainName: 'Binance Smart Chain Mainnet',
                            nativeCurrency: {
                                name: 'Binance Coin',
                                symbol: 'BNB',
                                decimals: 18
                            },
                            rpcUrls: [process.env.RPC_URL_BSC],
                            blockExplorerUrls: ['https://bscscan.com']
                        }],
                    });
                } catch (addError) {
                    console.log('addError', addError);
                }
            }
        }
    }
}
