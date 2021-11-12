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
        this.balance = 0;
        this.allowance = 0;

        this.contractZamAbi = '';
        this.contractAgentAbi = '';
        this.contractZamAddress = '';
        this.contractAgentAddress = '';

        this.network = '';
        this.swapMethod = '';

    }

    checkConnection = async () => {
        return this;
    };

    connect = async () => {
        return this;
    };

    getBalance = async () => {

    };

    getChainId = async () => {

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

    initBridgeContacts(swapMethod) {

        this.swapMethod = swapMethod;

        switch (swapMethod) {
            case 'swapETH2BSC':
                this.contractZamAbi = contractZamEthAbi;
                this.contractAgentAbi = contractEthAgentAbi;
                this.contractZamAddress = contractZamEthAddress;
                this.contractAgentAddress = contractEthAgentAddress;
                this.network = Web3.givenProvider;
                break;
            case 'swapBSC2ETH':
                this.contractZamAbi = contractZamBscAbi;
                this.contractAgentAbi = contractBscAgentAbi;
                this.contractZamAddress = contractZamBscAddress;
                this.contractAgentAddress = contractBscAgentAddress;
                this.network = 'https://bsc-dataseed.binance.org/';
                break;
            default:
                throw new Error('Way is not support');
        }
    }

    approve = async () => {
        try {
            if (!this.contractToken) {
                throw new Error('Contract token is not defined');
            }

            const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

            const transactionParameters = {
                to: this.contractZamAddress,
                from: this.address,
                'data': this.contractToken.methods.approve(this.contractAgentAddress, maxAmount).encodeABI()
            };
            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        } catch (e) {
            this.error = e.message;
        }
    }

    transfer = async (swapMethod, amount) => {
        try {
            if (parseFloat(amount) <= 0) {
                throw new Error('Please enter an amount greater than 0');
            }
            await this.checkConnection();
            const web3 = new Web3(this.network);

            const contractAgent = await new (web3.eth.Contract)(this.contractAgentAbi, this.contractAgentAddress);

            const amountInWei = Web3.utils.toWei(parseFloat(amount).toString());

            const transactionParametersSwap = {
                to: this.contractAgentAddress,
                from: this.address,
                data: contractAgent.methods[swapMethod](
                    this.contractZamAddress,
                    Web3.utils.toHex(amountInWei)
                ).encodeABI()
            };

            const gas = await web3.eth.estimateGas(transactionParametersSwap);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{...transactionParametersSwap, gas: Web3.utils.toHex(gas)}],
            });

        } catch (e) {
            this.error = e.message
        }
    }


    getTransactions = async (setTransactions) => {
        if (!this.address) {
            return false;
        }
        const api = `https://api.etherscan.io/api?module=account&action=txlist&address=${this.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${etherScanApiKey}`;

        fetch(api)
            .then((response) => {
                return response.json();
            }).then((data) => {
                if (!Array.isArray(data.result)) {
                    console.error(data.result);
                    setTransactions([]);
                } else {
                    setTransactions(data.result);
                }
        });
    }

}
