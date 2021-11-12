import Web3 from "web3";
import contractFactory from '../contracts/pancake/IPancakeFactory_ABI.json';
import {PancakeAddresses, PancakeNetworks} from "@src/config";

let initialState = {};


export async function farmingReducer(action) {
    const network = 'test';

    if (action === 'getPoolLength') {
        // Просмотр количества пулов.
        const web3 = new Web3(PancakeNetworks[network]);
        const contractFarm = new (web3.eth.Contract)(contractFactory, PancakeAddresses[network].factory);
        const poolLength = await contractFarm.methods.allPairsLength().call();
        console.log(poolLength);
        // const pool = await contractFarm.methods.poolInfo(poolLength - 1).call()
        console.log(contractFarm.methods);

    }

    // return {
    //     ...state,
    //     answerReceived: false
    // }
}
