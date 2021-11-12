import Web3 from "web3";
import {PancakeNetworks} from "@src/config/pancake";
import contractPancakeFactoryAbi from '@src/contracts/pancake/IPancakeFactory_ABI.json';
import contractPancakePairAbi from '@src/contracts/pancake/IPancakePair_ABI.json';
import contractPancakeRouterAbi from '@src/contracts/pancake/PancakeRouter_ABI.json';
import contractPancakeIerc20 from '@src/contracts/pancake/IERC20.json';
import contractPancakeBep20Impl from '@src/contracts/pancake/BEP20Impl.json';
import {PancakeAddresses, TOKEN_ADDRESES} from "@src/config";
import {ENV} from "@src/env";
import {dec2hex, sortTokens} from "@src/utils";


export class swapAction {
    constructor(wallet, swapFrom, swapTo) {
        this.network = PancakeNetworks[ENV];
        this.addressFactory = PancakeAddresses[ENV].factory;
        this.addressRouter = PancakeAddresses[ENV].router;
        this.wallet = wallet;
        this.tokenA = TOKEN_ADDRESES[ENV][swapTo];
        this.tokenB = TOKEN_ADDRESES[ENV][swapFrom];
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
            return 0;
        }
        const web3 = new Web3(this.network);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);
        const {reserveA, reserveB} = await this.getReserves(this.addressPair, this.tokenA, this.tokenB);

        return await contractRouter.methods.getAmountOut(amountA, reserveA, reserveB).call()
    }

    getAmountA = async (amountB) => {
        if (!amountB) {
            return 0;
        }
        const web3 = new Web3(this.network);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);
        const {reserveA, reserveB} = await this.getReserves(this.addressPair, this.tokenA, this.tokenB);

        return await contractRouter.methods.getAmountOut(amountB, reserveA, reserveB).call()
    }

    swapold = async (swapFrom, swapTo, amountFrom, amountTo) => {
        if (!amountFrom || !amountTo) {
            return false;
        }

        const tokenA = TOKEN_ADDRESES[ENV][swapTo];
        const tokenB = TOKEN_ADDRESES[ENV][swapFrom];

        const web3 = new Web3(this.network);

        const contractFactory = new (web3.eth.Contract)(contractPancakeFactoryAbi, this.addressFactory);
        const addressPair = await contractFactory.methods.getPair(tokenA, tokenB).call();

        const contractPair = new (web3.eth.Contract)(contractPancakePairAbi, addressPair);

        async function getReserves(pair, tokenA, tokenB) {
            const [token0, _] = sortTokens(tokenA, tokenB);
            const {reserve0, reserve1} = await contractPair.methods.getReserves().call();

            const [reserveA, reserveB] = (token0 === tokenA) ? [reserve0, reserve1] : [reserve1, reserve0];
            return {reserveA, reserveB}
        }


        const {reserveA, reserveB} = await getReserves(addressPair, tokenA, tokenB);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);
        // const transactionParameters = {
        //     to: this.addressRouter,
        //     from: this.wallet.address,
        //     data: contractRouter.methods.addLiquidity(
        //         tokenA,
        //         tokenB,
        //         amountFrom * Math.pow(10, 18),
        //         amountTo * Math.pow(10, 18),
        //         amountAMin,
        //         amountBMin,
        //         wallet.address,
        //         deadline
        //     ).encodeABI()
        // }

        const amountB = await contractRouter.methods.quote(amountFrom, reserveA, reserveB).call();
        const amountB2 = await contractRouter.methods.getAmountOut(amountFrom, reserveA, reserveB).call();

        console.log(amountFrom)
        console.log(reserveA, reserveB)
        console.log(amountB)
        console.log(amountB2)
    }

    getAllowance = async () => {
        await this.checkWalletConnection();

        const web3 = new Web3(this.network);

        const contractTokenA = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenA);
        const allowanceA = await contractTokenA.methods.allowance(this.wallet.address, this.addressRouter).call();
        // const balanceA = await contractTokenA.methods.balanceOf(this.wallet.address).call();

        const contractTokenB = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenB);
        const allowanceB = await contractTokenB.methods.allowance(this.wallet.address, this.addressRouter).call();
        // const balanceB = await contractTokenB.methods.balanceOf(this.wallet.address).call();

        return {
            allowanceA: parseInt(allowanceA),
            allowanceB: parseInt(allowanceB)
        }
    }

    approve = async () => {
        await this.checkWalletConnection();

        const web3 = new Web3(this.network);
        const maxAmount = '0x' + dec2hex('1' + '0'.repeat(60));

        const {allowanceA, allowanceB} = this.getAllowance();
        if (!allowanceA) {
            const contractTokenA = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenA);

            const transactionParameters = {
                to: this.tokenA,
                from: this.wallet.address,
                'data': contractTokenA.methods.approve(this.addressRouter, maxAmount).encodeABI()
            };

            const gas = await web3.eth.estimateGas(transactionParameters);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{...transactionParameters, gas: Web3.utils.toHex(Math.floor(gas * 1.1))}],
            });
        }
        if (!allowanceB) {
            const contractTokenB = new (web3.eth.Contract)(contractPancakeIerc20, this.tokenB);

            const transactionParameters = {
                to: this.tokenB,
                from: this.wallet.address,
                'data': contractTokenB.methods.approve(this.addressRouter, maxAmount).encodeABI()
            };

            const gas = await web3.eth.estimateGas(transactionParameters);

            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{...transactionParameters, gas: Web3.utils.toHex(Math.floor(gas * 1.1))}],
            });
        }

    }


    swap = async (amountFrom, amountTo) => {
        await this.checkWalletConnection();

        const web3 = new Web3(this.network);

        const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, this.addressRouter);

        const slippage = 1;
        const amountInMax = Math.floor(amountFrom * (1 + slippage / 100));
        const deadline = 20 * 60 + Math.floor(Date.now() / 1000);


        const transactionParams = {
            to: this.addressRouter,
            from: this.wallet.address,
            data: contractRouter.methods.swapTokensForExactTokens(
                amountTo,
                amountInMax,
                [this.tokenA, this.tokenB],
                this.wallet.address,
                deadline.toString()
                ).encodeABI()
        }

        const gas = await web3.eth.estimateGas(transactionParams);

        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{...transactionParams, gas: Web3.utils.toHex(Math.floor(gas))}],
        });
    }

    checkWalletConnection = async () => {
        if (!this.wallet.address) {
            await this.wallet.checkConnection();
        }
    }
}


export const getPrice = (setRate, setPriceChange24, setPriceChangePercentage24) => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/contract/0xd373576a9e738f37dc6882328358ff69c4caf4c6')
        .then((response) => {
            return response.json();
        }).then((data) => {
        setRate(data.market_data.current_price.usd);
        setPriceChange24(data.market_data.price_change_24h);
        setPriceChangePercentage24(data.market_data.price_change_percentage_24h);
    });
}
