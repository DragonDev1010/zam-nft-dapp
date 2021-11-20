import Web3 from "web3";
import {
    contractBscAgentAddress,
    contractEthAgentAddress,
    contractZamBscAddress,
    contractZamEthAddress, etherScanApiKey,
} from "@src/config";
import {dec2hex} from "@src/utils";
import contractZamEthAbi from "@src/contracts/bridge/zam_eth.json";
import contractEthAgentAbi from "@src/contracts/bridge/eth_agent.json";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import contractBscAgentAbi from "@src/contracts/bridge/bsc_agent.json";
import {SWAP_BSC_ETH, SWAP_ETH_BSC} from "@src/constants";
import {CHAIN_ID_BINANCE, CHAIN_ID_ETH} from "../constants";


export class bridgeAction {
    constructor(wallet, swapMethod) {
        this.error = '';
        this.balance = 0;
        this.allowance = 0;

        this.swapMethod = swapMethod;
        this.wallet = wallet;
    }

    init = async () => {
        await this.checkWalletConnection();

        switch (this.swapMethod) {
            case 'swapETH2BSC':
                this.contractZamAbi = contractZamEthAbi;
                this.contractAgentAbi = contractEthAgentAbi;
                this.contractZamAddress = contractZamEthAddress;
                this.contractAgentAddress = contractEthAgentAddress;
                this.network = this.wallet.getNetwork(CHAIN_ID_ETH);

                break;
            case 'swapBSC2ETH':
                this.contractZamAbi = contractZamBscAbi;
                this.contractAgentAbi = contractBscAgentAbi;
                this.contractZamAddress = contractZamBscAddress;
                this.contractAgentAddress = contractBscAgentAddress;
                this.network = this.wallet.getNetwork(CHAIN_ID_BINANCE);
                break;
            default:
                throw new Error('Way is not support');

        }

        const web3 = new Web3(this.network);
        this.contractToken = new (web3.eth.Contract)(this.contractZamAbi, this.contractZamAddress);

    }

    getChainId = async () => {
        return await this.wallet.getChainId();
    };

    getBalance = async () => {
        this.error = '';
        this.balance = 0;
        this.allowance = 0;

        try {
            await this.init();

            if (!this.wallet.address) {
                return;
            }

            const chainId = await this.getChainId();

            if (this.wallet.type === 'metamask') {
                if (chainId !== '0x1' && this.swapMethod === SWAP_ETH_BSC) {
                    throw new Error('Please switch you Metamask wallet to Ethereum network.');
                }
                if (chainId !== '0x38' && this.swapMethod === SWAP_BSC_ETH) {
                    throw new Error('Please switch you Metamask wallet to Binance Smart Chain network.');
                }
            } else if (this.wallet.type === 'binance') {
                if (chainId !== '0x01' && this.swapMethod === SWAP_ETH_BSC) {
                    throw new Error('Please switch you Binance Chain wallet to Ethereum network.');
                }
                if (chainId !== '0x38' && this.swapMethod === SWAP_BSC_ETH) {
                    throw new Error('Please switch you Binance Chain to Binance Smart Chain network.');
                }
            } else if (this.wallet.type === 'walletconnect') {
                if (chainId !== 1 && this.swapMethod === SWAP_ETH_BSC) {
                    throw new Error('Please switch you wallet to Ethereum network.');
                }
                if (chainId !== 56 && this.swapMethod === SWAP_BSC_ETH) {
                    throw new Error('Please switch you wallet to Binance Smart Chain network.');
                }
            }

            const balance = await this.contractToken.methods.balanceOf(this.wallet.address).call();
            const allowance = await this.contractToken.methods.allowance(this.wallet.address, this.contractAgentAddress).call();

            this.balance = Web3.utils.fromWei(balance);
            this.allowance = allowance;
        } catch (err) {
            this.error = err.message;
        }

    }


    approve = async () => {
        try {
            await this.init();

            const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

            const transactionParameters = {
                to: this.contractZamAddress,
                from: this.wallet.address,
                'data': this.contractToken.methods.approve(this.contractAgentAddress, maxAmount).encodeABI()
            };

            const provider = await this.wallet.getProvider();
            await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        } catch (e) {
            this.error = e.message;
        }

    }


    transfer = async (amount) => {
        try {
            if (parseFloat(amount) <= 0) {
                throw new Error('Please enter an amount greater than 0');
            }
            this.init();

            const web3 = new Web3(this.network);

            const contractAgent = await new (web3.eth.Contract)(this.contractAgentAbi, this.contractAgentAddress);

            const amountInWei = Web3.utils.toWei(parseFloat(amount).toString());

            const transactionParametersSwap = {
                to: this.contractAgentAddress,
                from: this.wallet.address,
                data: contractAgent.methods[swapMethod](
                    this.contractZamAddress,
                    Web3.utils.toHex(amountInWei)
                ).encodeABI()
            };

            const gas = await web3.eth.estimateGas(transactionParametersSwap);

            const provider = await this.wallet.getProvider();

            await await provider.request({
                method: 'eth_sendTransaction',
                params: [{...transactionParametersSwap, gas: Web3.utils.toHex(gas)}],
            });

        } catch (e) {
            this.error = e.message
        }
    }

    getTransactions = async (setTransactions) => {
        if (!this.wallet.address) {
            return false;
        }
        const api = `https://api.etherscan.io/api?module=account&action=txlist&address=${this.wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${etherScanApiKey}`;

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

    checkWalletConnection = async () => {
        if (!this.wallet.address) {
            await this.wallet.checkConnection();
        }
    }
}

