import Web3 from "web3";
import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {dec2hex} from "@src/utils";

export class WalletBinance extends WalletAbstract {
    constructor() {
        super();

        this.type = 'binance';
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

    getBalance = async () => {
        const web3 = new Web3(this.network);
        this.error = '';
        this.balance = 0;
        this.allowance = 0;

        try {
            const chainId = await this.getChainId();

            if (chainId !== '0x01' && this.swapMethod === 'swapETH2BSC') {
                throw new Error('Please switch you Binance Chain wallet to Etherium network.');
            }
            if (chainId !== '0x38' && this.swapMethod === 'swapBSC2ETH') {
                throw new Error('Please switch you Binance Chain to Binance Smart Chain network.');
            }

            const contractToken = new (web3.eth.Contract)(this.contractZamAbi, this.contractZamAddress);


            const balance = await contractToken.methods.balanceOf(this.address).call();

            const allowance = await contractToken.methods.allowance(this.address, this.contractAgentAddress).call();

            this.contractToken = contractToken;
            this.balance = Web3.utils.fromWei(balance);
            this.allowance = allowance;
        } catch (err) {
            this.error = err.message;
        }

    };



    getChainId = async () => {
        const response = await window.BinanceChain.send('eth_chainId');
        return response.result;
    };

}
