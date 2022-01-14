import Web3 from "web3";
import {
    contractBscAgentAddress,
    contractEthAgentAddress, contractUcoBscAddress, contractUcoEthAddress,
    contractZamBscAddress,
    contractZamEthAddress, etherScanApiKey,
} from "@src/config";
import {dec2hex} from "@src/utils";
import contractEthAgentAbi from "@src/contracts/bridge/eth_agent.json";
import contractBscAgentAbi from "@src/contracts/bridge/bsc_agent.json";
import contractZamEthAbi from "@src/contracts/bridge/zam_eth.json";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import contractUcoEthAbi from "@src/contracts/bridge/uco_eth.json";
import contractUcoBscAbi from "@src/contracts/bridge/uco_bsc.json";
import {NETWORK_BSC, NETWORK_ETH, SWAP_BSC_ETH, SWAP_ETH_BSC, TOKEN_UCO, TOKEN_ZAM} from "@src/constants";
import {CHAIN_ID_BSC, CHAIN_ID_ETH} from "../constants";

const tokenToContractAddressMap = {
    eth: {
        [TOKEN_ZAM]: contractZamEthAddress,
        [TOKEN_UCO]: contractUcoEthAddress,
    },
    bsc: {
        [TOKEN_ZAM]: contractZamBscAddress,
        [TOKEN_UCO]: contractUcoBscAddress,
    },
}
const tokenToContractTokenAbiMap = {
    eth: {
        [TOKEN_ZAM]: contractZamEthAbi,
        [TOKEN_UCO]: contractUcoEthAbi,
    },
    bsc: {
        [TOKEN_ZAM]: contractZamBscAbi,
        [TOKEN_UCO]: contractUcoBscAbi,
    },
}

export class bridgeAction {
    constructor(wallet, swapMethod, token) {
        this.errorAction = [];
        this.needChainId = 0;

        this.swapMethod = swapMethod;
        this.token = token;
        this.wallet = wallet;
        this.commissionValue = 0;
    }

    init = async () => {
        await this.checkWalletConnection();

        switch (this.swapMethod) {
            case 'swapETH2BSC':
                this.contractTokenAbi = tokenToContractTokenAbiMap['eth'][this.token];
                this.contractAgentAbi = contractEthAgentAbi;
                this.contractTokenAddress = tokenToContractAddressMap['eth'][this.token];
                this.contractAgentAddress = contractEthAgentAddress;
                this.network = this.wallet.getNetwork(CHAIN_ID_ETH);
                this.commissionValue = 20000000000000000;
                break;
            case 'swapBSC2ETH':
                this.contractTokenAbi = tokenToContractTokenAbiMap['bsc'][this.token];
                this.contractAgentAbi = contractBscAgentAbi;
                this.contractTokenAddress = tokenToContractAddressMap['bsc'][this.token];
                this.contractAgentAddress = contractBscAgentAddress;
                this.network = this.wallet.getNetwork(CHAIN_ID_BSC);
                this.commissionValue = 1000000000000000;
                break;
            default:
                throw new Error('Way is not supported');

        }
        const web3 = new Web3(this.network);
        this.contractToken = new (web3.eth.Contract)(this.contractTokenAbi, this.contractTokenAddress);

    }


    getBalance = async () => {
        try {
            await this.init();

            if (!this.wallet.address) {
                return;
            }
            await this.checkWalletChain();

            const balance = await this.contractToken.methods.balanceOf(this.wallet.address).call();
            const allowance = await this.contractToken.methods.allowance(this.wallet.address, this.contractAgentAddress).call();

            return {
                balance: Web3.utils.fromWei(balance),
                allowance,
            }
        } catch (err) {
            this.errorAction.push(err.message);
        }

    }


    approve = async (setIsPending) => {
        try {
            await this.init();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

            const transactionParameters = {
                to: this.contractTokenAddress,
                from: this.wallet.address,
                'data': this.contractToken.methods.approve(this.contractAgentAddress, maxAmount).encodeABI()
            };

            const provider = await this.wallet.getProvider();
            const web3 = new Web3(provider);

            await web3.eth.sendTransaction(transactionParameters)
                .once('transactionHash', (hash) => setIsPending(!!hash))
                .on('confirmation', (confNumber, receipt) => {
                    if (confNumber.toString() === '0') {
                        setIsPending(false)
                    }
                })

        } catch (e) {
            this.errorAction.push(e.message);
        }

    }


    transfer = async (amount, setIsPending) => {
        try {
            if (parseFloat(amount) <= 0) {
                throw new Error('Please enter an amount greater than 0');
            }
            await this.init();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            const web3 = new Web3(this.network);

            const contractAgent = await new (web3.eth.Contract)(this.contractAgentAbi, this.contractAgentAddress);

            const amountInWei = Web3.utils.toWei(parseFloat(amount).toString());

            const transactionParametersSwap = {
                to: this.contractAgentAddress,
                from: this.wallet.address,
                data: contractAgent.methods[this.swapMethod](
                    this.contractTokenAddress,
                    Web3.utils.toHex(amountInWei)
                ).encodeABI()
            };

            const gas = await web3.eth.estimateGas({value: this.commissionValue});
            // const gas = await contractAgent.methods[this.swapMethod](
            //     this.contractTokenAddress,
            //     Web3.utils.toHex(amountInWei)
            // ).estimateGas({value: this.commissionValue, from: this.wallet.address});

            const provider = await this.wallet.getProvider();

            await new Web3(provider).eth.sendTransaction(
                {
                    ...transactionParametersSwap,
                    gas: Web3.utils.toHex(parseInt(gas * 1.1)),
                    value: this.commissionValue
                }
            )
                .once('transactionHash', (hash) => setIsPending(!!hash))
                .on('confirmation', (confNumber, receipt) => {
                    if (confNumber.toString() === '0') {
                        setIsPending(false)
                    }
                })

        } catch (e) {
            this.errorAction.push(e.message);
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

    checkWalletChain = async (needException = true) => {
        const chainId = await this.wallet.getChainId();

        if (chainId !== CHAIN_ID_ETH && chainId !== '0x01' && this.swapMethod === SWAP_ETH_BSC) {
            this.needChainId = NETWORK_ETH;
            const message = 'Please switch your wallet to Ethereum network.';
            this.errorAction.push(message);
            if (needException) {
                throw new Error(message);
            }
        }
        if (chainId !== CHAIN_ID_BSC && this.swapMethod === SWAP_BSC_ETH) {
            this.needChainId = NETWORK_BSC;
            const message = 'Please switch your wallet to Binance Smart Chain network.';
            this.errorAction.push(message);

            if (needException) {
                throw new Error(message);
            }
        }

    }
}

