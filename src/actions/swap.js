import Web3 from "web3";
import {PancakeNetworks} from "@src/config/pancake";
import contractPancakeFactoryAbi from '@src/contracts/pancake/IPancakeFactory_ABI.json';
import contractPancakePairAbi from '@src/contracts/pancake/IPancakePair_ABI.json';
import contractPancakeRouterAbi from '@src/contracts/pancake/PancakeRouter_ABI.json';
import {PancakeAddresses, TOKEN_ADDRESES} from "@src/config";
import {ENV} from "@src/env";
import {sortTokens} from "@src/utils";

const network = PancakeNetworks[ENV];
const addressFactory = PancakeAddresses[ENV].factory;
const addressRouter = PancakeAddresses[ENV].router;


export const actionSwap = async (wallet, swapFrom, swapTo, amountFrom, amountTo) => {
    if (!amountFrom || !amountTo) {
        return false;
    }

    const tokenA = TOKEN_ADDRESES[ENV][swapTo];
    const tokenB = TOKEN_ADDRESES[ENV][swapFrom];

    const web3 = new Web3(network);

    const contractFactory = new (web3.eth.Contract)(contractPancakeFactoryAbi, addressFactory);
    const addressPair = await contractFactory.methods.getPair(tokenA, tokenB).call();

    const contractPair = new (web3.eth.Contract)(contractPancakePairAbi, addressPair);

    async function getReserves(pair, tokenA, tokenB) {
        const [token0, _] = sortTokens(tokenA, tokenB);
        const {reserve0, reserve1} = await contractPair.methods.getReserves().call();

        const [reserveA, reserveB] = (token0 === tokenA) ? [reserve0, reserve1] : [reserve1, reserve0];
        return {reserveA, reserveB}
    }


    const {reserveA, reserveB} = await getReserves(addressPair, tokenA, tokenB);

    const contractRouter = new (web3.eth.Contract)(contractPancakeRouterAbi, addressRouter);
    // const transactionParameters = {
    //     to: addressRouter,
    //     from: wallet.address,
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
