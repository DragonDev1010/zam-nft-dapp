import Web3 from "web3";
import React from "react";
import {WalletAbstract} from "@src/wallets/wallet-abstract";
import {dec2hex} from "@src/utils";

export class WalletMetamask extends WalletAbstract {
    constructor() {
        super();

        this.type = 'metamask';
    }

    checkConnection = async () => {
        await this.query('eth_accounts');
        return this;
    }

    connect = async () => {
        await this.query('eth_requestAccounts');
        return this;
    }

    async query(method) {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({method});

                if (!addressArray.length) {
                    return;
                }
                this.address = addressArray[0];
            } catch (err) {
                this.error = err.message;
            }
        } else {
            this.error = (
                <span>
                    Please install <a target='_blank' href={`https://metamask.io/download.html`}>Metamask</a>,
                    a virtual Ethereum wallet, in your browser.
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

            if (chainId !== '0x1' && this.swapMethod === 'swapETH2BSC') {
                throw new Error('Please switch you Metamask wallet to Etherium network.');
            }
            if (chainId !== '0x38' && this.swapMethod === 'swapBSC2ETH') {
                throw new Error('Please switch you Metamask wallet to Binance Smart Chain network.');
            }

            const contractToken = new (web3.eth.Contract)(this.contractZamAbi, this.contractZamAddress);


            const balance = await contractToken.methods.balanceOf(this.address).call();

            const allowance = await contractToken.methods.allowance(this.address, this.contractAgentAddress).call();

            this.contractToken = contractToken; //
            this.balance = Web3.utils.fromWei(balance);
            this.allowance = allowance;
        } catch (err) {
            this.error = err.message;
        }

    }



    getChainId = async () => {
        return await window.ethereum.request({method: 'eth_chainId'});
    }
}
