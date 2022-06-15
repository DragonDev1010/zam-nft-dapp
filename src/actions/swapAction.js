import Web3 from "web3";
import contractPancakeFactoryAbi from '@src/contracts/pancake/IPancakeFactory_ABI.json';
import contractPancakePairAbi from '@src/contracts/pancake/IPancakePair_ABI.json';
import contractPancakeRouterAbi from '@src/contracts/pancake/PancakeRouter_ABI.json';
import contractPancakeIerc20 from '@src/contracts/pancake/IERC20.json';
import {PancakeAddresses, TOKEN_ADDRESES} from "@src/config";
import {dec2hex, sortTokens} from "@src/utils";
import {CHAIN_ID_BSC, NETWORK_BSC} from "../constants";

const NETWORK_ENV = process.env.NETWORK_ENV;
const NETWORK_URL = process.env.RPC_URL_BSC;

export class SwapAction {
    constructor(wallet, swapFrom, swapTo) {
        this.errorAction = [];
        this.needChainId = 0;

        this.network = NETWORK_URL;
        this.addressFactory = PancakeAddresses[NETWORK_ENV].factory;
        this.addressRouter = PancakeAddresses[NETWORK_ENV].router;
        this.wallet = wallet;
        this.tokenA = TOKEN_ADDRESES[NETWORK_ENV][swapFrom];
        this.tokenB = TOKEN_ADDRESES[NETWORK_ENV][swapTo];
    }

    init = async () => {
        const web3 = new Web3(this.network);
        const contractFactory = new (web3.eth.Contract)(contractPancakeFactoryAbi, this.addressFactory);
        this.addressPair = await contractFactory.methods.getPair(this.tokenA, this.tokenB).call();
        this.contractPair = new (web3.eth.Contract)(contractPancakePairAbi, this.addressPair);
    }

    getReserves = async () => {
        await this.init();

        const [token0, _] = sortTokens(this.tokenA, this.tokenB);
        const {reserve0, reserve1} = await this.contractPair.methods.getReserves().call();

        const [reserveA, reserveB] = (token0 === this.tokenA) ? [reserve0, reserve1] : [reserve1, reserve0];
        return {reserveA, reserveB}
    }


    getAmountB = async (amountA) => {
        if (!amountA) {
            return undefined;
        }
        const web3 = new Web3(this.network);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);
        const {reserveA, reserveB} = await this.getReserves(this.addressPair, this.tokenA, this.tokenB);

        const amount = await contractRouter.methods
            .getAmountOut(Web3.utils.toWei(amountA.toString()), reserveA, reserveB).call();

        return Web3.utils.fromWei(amount);
    }

    getAmountA = async (amountB) => {
        if (!amountB) {
            return undefined;
        }
        const web3 = new Web3(this.network);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);
        const {reserveA, reserveB} = await this.getReserves(this.addressPair, this.tokenA, this.tokenB);

        const amount = await contractRouter.methods
            .getAmountOut(Web3.utils.toWei(amountB.toString()), reserveA, reserveB).call();

        return Web3.utils.fromWei(amount);
    }

    getAllowance = async () => {
        try {
            await this.checkWalletConnection();

            if (!this.wallet.address) {
                return;
            }

            await this.checkWalletChain(false);

            const web3 = new Web3(this.network);

            const contractTokenA = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenA);
            const allowanceA = await contractTokenA.methods.allowance(this.wallet.address, this.addressRouter).call();

            const contractTokenB = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenB);
            const allowanceB = await contractTokenB.methods.allowance(this.wallet.address, this.addressRouter).call();

            return {
                allowanceA: parseInt(allowanceA),
                allowanceB: parseInt(allowanceB)
            }
        } catch (e) {
            this.errorAction.push(e.message);
        }
    }

    approve = async (setIsPending) => {
        this.error = '';
        try {
            await this.checkWalletConnection();

            await this.checkWalletChain();

            const web3 = new Web3(this.network);
            const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

            const {allowanceA, allowanceB} = this.getAllowance();
            if (!allowanceA) {
                const contractTokenA = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenA);

                const transactionParameters = {
                    to: this.tokenA,
                    from: this.wallet.address,
                    data: contractTokenA.methods.approve(this.addressRouter, maxAmount).encodeABI()
                };

                const gas = await web3.eth.estimateGas(transactionParameters);
                const provider = await this.wallet.getProvider();

                await new Web3(provider).eth
                    .sendTransaction({...transactionParameters, gas: Web3.utils.toHex(Math.floor(gas * 1.1))})
                    .once('transactionHash', (hash) => setIsPending(!!hash))
                    .on('confirmation', (confNumber, receipt) => {
                        if (confNumber.toString() === '0') {
                            setIsPending(false)
                        }
                    })
            }
            if (!allowanceB) {
                const contractTokenB = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenB);

                const transactionParameters = {
                    to: this.tokenB,
                    from: this.wallet.address,
                    data: contractTokenB.methods.approve(this.addressRouter, maxAmount).encodeABI()
                };

                const gas = await web3.eth.estimateGas(transactionParameters);
                const provider = await this.wallet.getProvider();

                await new Web3(provider).eth
                    .sendTransaction({...transactionParameters, gas: Web3.utils.toHex(Math.floor(gas * 1.1))})
                    .once('transactionHash', (hash) => setIsPending(!!hash))
                    .on('confirmation', (confNumber, receipt) => {
                        if (confNumber.toString() === '0') {
                            setIsPending(false)
                        }
                    })
            }
        } catch (e) {
            this.errorAction.push(e.message);
        }

    }


    swap = async (amountFrom, amountTo, setIsPending, slippage = .1, deadline = 30) => {
        try {
            await this.checkWalletConnection();

            await this.checkWalletChain();

            const {allowanceA, allowanceB} = await this.getAllowance();

            if (!allowanceA || !allowanceB) {
                throw new Error('Approve required');
            }

            const web3 = new Web3(this.network);

            const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);

            const amountInMax = amountFrom * (1 + slippage / 100);
            const deadlineSeconds = deadline * 60 + Math.floor(Date.now() / 1000);

            const amountInMaxWei = Web3.utils.toWei(parseFloat(amountInMax).toString());
            const amountToWei = Web3.utils.toWei(parseFloat(amountTo).toString());


            const transactionParams = {
                to: this.addressRouter,
                from: this.wallet.address,
                data: contractRouter.methods.swapTokensForExactTokens(
                    amountToWei,
                    amountInMaxWei,
                    [this.tokenA, this.tokenB],
                    this.wallet.address,
                    deadlineSeconds.toString()
                ).encodeABI()
            }

            const gas = await web3.eth.estimateGas(transactionParams);
            const provider = await this.wallet.getProvider();

            await new Web3(provider).eth
                .sendTransaction({...transactionParams, gas: Web3.utils.toHex(Math.floor(gas))})
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

