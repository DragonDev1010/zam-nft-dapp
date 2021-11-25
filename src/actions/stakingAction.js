import Web3 from "web3";
import contractZamStakingAbi from '@src/contracts/staking/ZamStackingABI.json';
import {dec2hex} from "@src/utils";
import {CHAIN_ID_BSC, NETWORK_BSC} from "../constants";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import {ADDRESS_STAKING, contractZamBscAddress} from "../config";

const NETWORK_ENV = process.env.NETWORK_ENV;
const RPC_URL_BSC = process.env.RPC_URL_BSC;

export class StakingAction {
    constructor(wallet) {
        this.wallet = wallet;
        this.network = 'https://bsc-dataseed.binance.org/'; // test env doesn't have contract
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
            apy = apy/1000;
        } else {
            apy = apy/100;
        }

        return parseFloat(apy) || 89;
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

    approve = async () => {
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
            await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }


    claimRewards = async () => {
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
            await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        } catch (err) {
            this.errorAction.push(err.message);
        }
    }

    stakeOrUnstake = async (action, toState, toUnstake) => {
        try {
            await this.checkWalletConnection();
            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain();

            let transactionParameters = {};
            if (action === 'stake') {
                await this.getBalance();

                if (toState > this.balance) {
                    throw new Error('The specified amount exceeds your balance');
                }
                transactionParameters = {
                    from: this.wallet.address,
                    to: this.addressStaking,
                    data: this.stackingContract.methods.deposit(Web3.utils.toWei(toState.toString())).encodeABI()
                }
            } else if (action === 'unstake') {
                const staked = await this.getStaked();

                if (toUnstake > staked) {
                    throw new Error('The specified amount cannot exceed staked value');
                }

                transactionParameters = {
                    from: this.wallet.address,
                    to: this.addressStaking,
                    data: this.stackingContract.methods.withdraw(Web3.utils.toWei(toUnstake.toString())).encodeABI()
                }

            } else {
                throw new Error('Action is not supported');
            }

            const provider = await this.wallet.getProvider();
            await provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
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

