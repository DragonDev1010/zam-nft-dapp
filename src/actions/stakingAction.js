import Web3 from "web3";
import contractZamStakingAbi from '@src/contracts/staking/ZamStackingABI.json';
import {dec2hex, fromWei} from "@src/utils";
import {CHAIN_ID_BSC, NETWORK_BSC} from "../constants";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import {ADDRESS_STAKING, contractZamBscAddress} from "../config";

const RPC_URL_BSC = process.env.RPC_URL_BSC;

export class StakingAction {
    constructor(wallet) {
        this.wallet = wallet;
        this.network = RPC_URL_BSC;
        this.addressStaking = ADDRESS_STAKING;
        this.addressZam = contractZamBscAddress;
        this.errorAction = [];
        this.needChainId = 0;

        const web3 = new Web3(this.network);
        this.stackingContract = new (web3.eth.Contract)(contractZamStakingAbi, this.addressStaking);
        this.zamTokenContract = new (web3.eth.Contract)(contractZamBscAbi, this.addressZam);
    }

    getApy = async () => {
        let apy = await this.stackingContract.methods.percent().call();

        if (apy >= 10000) {
            apy = apy / 1000;
        } else {
            apy = apy / 100;
        }

        return parseFloat(apy) || 89;
    }

    getTotalRewards = async () => {
        const rewards = await this.stackingContract.methods.rewardClaimed().call();

        return parseInt(fromWei(rewards));
    }

    getReward = async () => {
        try {
            await this.checkWalletConnection();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain(false);
            
            const reward = await this.stackingContract.methods.pendingReward(this.wallet.address).call();
            return parseFloat(Web3.utils.fromWei(reward));
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }
    
    getStaked = async () => {
        try {
            await this.checkWalletConnection();
            
            if (!this.wallet.address) {
                return;
            }
            
            await this.checkWalletChain(false);
            
            const stakers = await this.stackingContract.methods.userInfo(this.wallet.address).call();
            if (stakers[0]) {
                return parseFloat(Web3.utils.fromWei(stakers[0]));
            }
            return 0;
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }

    getBalance = async () => {
        try {
            await this.checkWalletConnection();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain(false);

            const balance = await this.zamTokenContract.methods.balanceOf(this.wallet.address).call();
            const allowance = await this.zamTokenContract.methods.allowance(this.wallet.address, this.addressStaking).call();

            return {
                balance: parseFloat(Web3.utils.fromWei(balance)),
                allowance
            }
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }

    approve = async (setIsPending) => {
        try {
            await this.checkWalletConnection();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

            const transactionParameters = {
                to: this.addressZam,
                from: this.wallet.address,
                'data': this.zamTokenContract.methods.approve(this.addressStaking, maxAmount).encodeABI()
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
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }


    claimRewards = async (setIsPending) => {
        try {
            await this.checkWalletConnection();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            const transactionParameters = {
                from: this.wallet.address,
                to: this.addressStaking,
                data: this.stackingContract.methods.deposit(0).encodeABI()
            }

            const provider = await this.wallet.getProvider();
            const web3 = new Web3(provider);

            await web3.eth.sendTransaction(transactionParameters)
                .once('transactionHash', (hash) => setIsPending(!!hash))
                .on('confirmation', (confNumber, receipt) => {
                    if (confNumber.toString() === '0') {
                        setIsPending(false)
                    }
                })
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }

    stakeOrUnstake = async (action, toStake, toUnstake, setIsPending) => {
        try {
            await this.checkWalletConnection();
            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            let transactionParameters = {};
            if (action === 'stake') {
                const {balance} = await this.getBalance();

                if (toStake > balance) {
                    throw new Error('The specified amount exceeds your balance');
                }
                const amount = Web3.utils.toWei(parseFloat(toStake).toString());

                transactionParameters = {
                    from: this.wallet.address,
                    to: this.addressStaking,
                    data: this.stackingContract.methods.deposit(amount).encodeABI()
                }
            } else if (action === 'unstake') {
                const staked = await this.getStaked();

                if (toUnstake > staked) {
                    throw new Error('The specified amount cannot exceed staked value');
                }

                const amount = Web3.utils.toWei(parseFloat(toUnstake).toString());
                transactionParameters = {
                    from: this.wallet.address,
                    to: this.addressStaking,
                    data: this.stackingContract.methods.withdraw(amount).encodeABI()
                }

            } else {
                throw new Error('Action is not supported');
            }

            const provider = await this.wallet.getProvider();
            const web3 = new Web3(provider);
            const gas = await web3.eth.estimateGas(transactionParameters);

            await web3.eth.sendTransaction({...transactionParameters, gas: Web3.utils.toHex(Math.floor(gas))})
                .once('transactionHash', (hash) => setIsPending(!!hash))
                .on('confirmation', (confNumber, receipt) => {
                    if (confNumber.toString() === '0') {
                        setIsPending(false)
                    }
                })
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }


    checkWalletConnection = async () => {
        if (!this.wallet.address) {
            await this.wallet.checkConnection();
        }
    }

    getChainId = async () => {
        return await this.wallet.getChainId();
    };

    checkWalletChain = async (needException = true) => {
        const chainId = await this.getChainId();

        if (chainId !== CHAIN_ID_BSC) {
            this.needChainId = NETWORK_BSC;
            const message = 'Please switch your wallet to Binance Smart Chain network.';
            this.errorAction.push(message);
            if (needException) {
                throw new Error(message);
            }
        }
    }
}

