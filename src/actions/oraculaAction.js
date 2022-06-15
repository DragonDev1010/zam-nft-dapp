import Web3 from "web3";

import oraculaAbi from "@src/contracts/zampad/oracula.json"
import usdtTokenAbi from "@src/contracts/zampad/tokenUSDT.json"
import {OraculaAdress, OraculaTokenAddress} from "../config/zampad"
import {CHAIN_ID_BSC, CHAIN_ID_BSC_TESTNET} from "@src/constants";

import nftContractAbi from "@src/contracts/nft/trillioHeirsABI.json"
import {TrillioHeirsAddress} from "../config/trillioHeirs"

export class OraculaAction {
    constructor(wallet) {
        this.initing = false;

        this.oraculaReadContract = null;
        this.oraculaWriteContract = null;
        this.tokenReadContract = null;
        this.tokenWriteContract = null;
        this.nftContract = null;

        this.errorAction = [];
        this.web3Reader = null;
        this.web3Nft = null;

        this.wallet = wallet;
    }

    init = async () => {
        if (this.initing) {
            return;
        }

        this.initing = true;

        this.web3Nft = new Web3(process.env.RPC_URL_ETH_ANKR);
        this.nftContract = new this.web3Nft.eth.Contract(nftContractAbi, TrillioHeirsAddress);

        console.log("process.env.RPC_URL_BSC = ", process.env.RPC_URL_BSC);
        console.log("OraculaAdress = ", OraculaAdress);

        this.web3Reader = new Web3(process.env.RPC_URL_BSC);
        this.tokenReadContract = new this.web3Reader.eth.Contract(usdtTokenAbi, OraculaTokenAddress);
        this.oraculaReadContract = new this.web3Reader.eth.Contract(oraculaAbi, OraculaAdress);

        if (!this.wallet || !this.wallet.address) {
            console.log("no wallet connected");
            return;
        }

        //console.log("initing writers");
        const provider = await this.wallet.getProvider();
        //console.log("provider = ", provider);
        const web3Writer = new Web3(provider);
        this.tokenWriteContract = new web3Writer.eth.Contract(usdtTokenAbi, OraculaTokenAddress);
        this.oraculaWriteContract = new web3Writer.eth.Contract(oraculaAbi, OraculaAdress);
    }

    getChainId = async (wallet) => {
        return await wallet.getChainId();
    }

    getWalletBalance = async (wallet) => {
        await this.init();

        if (!wallet.address) {
            return;
        }

        const balance = await this.web3Reader.eth.getBalance(wallet.address);
        return this.web3Reader.utils.fromWei(balance, "ether");
    };

    checkWalletChain = async (wallet, needException = true) => {
        const chainId = await wallet.getChainId();

        if (chainId !== CHAIN_ID_BSC && chainId !== CHAIN_ID_BSC_TESTNET) {
            this.needChainId = CHAIN_ID_BSC;
            const message = 'Please switch your wallet to Binance Smart Chain network.';
            this.errorAction.push(message);
            if (needException) {
                throw new Error(message);
            }
        }
    }

    getSale = async () => {
        await this.init();
        const sale = await this.oraculaReadContract.methods.sale().call();
        sale.allocationTotal = this.web3Reader.utils.fromWei(sale.allocationTotal, "ether");
        sale.allocationSold = this.web3Reader.utils.fromWei(sale.allocationSold, "ether");

        return sale;
    }

    isPaused = async () => {
        await this.init();

        return await this.oraculaReadContract.methods.isPaused().call();
    }

    getStage = async () => {
        await this.init();

        const stage = await this.oraculaReadContract.methods.getCurrentRound().call();
        return parseInt(stage);
    }

    getRounds = async () => {
        await this.init();

        return await this.oraculaReadContract.methods.getRounds().call();
    }

    getNftCount = async (wallet) => {
        await this.init();

        const count = await this.nftContract.methods.balanceOf(wallet.address).call()
        return parseInt(count);
    }

    getRegisteredUsersCount = async () => {
        await this.init();

        const count = await this.oraculaReadContract.methods.getRegisteredUsersCount().call()
        return parseInt(count);
    }

    getBelt = async (wallet) => {
        await this.init();

        const belt = await this.oraculaReadContract.methods.getBelt(wallet.address).call()
        return parseInt(belt);
    }

    getAvailableAllocationAtRound2 = async (wallet) => {
        await this.init();

        const allocation = await this.oraculaReadContract.methods.getAvailableAllocationAtRound2(wallet.address).call()
        return this.web3Reader.utils.fromWei(allocation, "ether");
    }

    registeredUser = async (wallet) => {
        await this.init();

        const user = await this.oraculaReadContract.methods.registeredUsers(wallet.address).call();
        if (user) {
            user.belt = parseInt(user.belt);
            user.stakedZAM = this.web3Reader.utils.fromWei(user.stakedZAM, "ether");
            user.allocationBoughtAtRound1 = this.web3Reader.utils.fromWei(user.allocationBoughtAtRound1, "ether");
            user.allocationBoughtAtRound2 = this.web3Reader.utils.fromWei(user.allocationBoughtAtRound2, "ether");
        }

        return user;
    }

    getPool = async (belt) => {
        await this.init();

        let pool = await this.oraculaReadContract.methods.pools(belt).call()
        if (pool) {
            pool.minStakedZAM = this.web3Reader.utils.fromWei(pool.minStakedZAM, "ether");
            pool.allocationTotal = this.web3Reader.utils.fromWei(pool.allocationTotal, "ether");
            pool.allocationSold = this.web3Reader.utils.fromWei(pool.allocationSold, "ether");
            pool.usersWithoutNft = parseInt(pool.usersWithoutNft);
            pool.usersWithNft = parseInt(pool.usersWithNft);
            pool.maxAllocationGuaranteedWithoutNft = this.web3Reader.utils.fromWei(pool.maxAllocationGuaranteedWithoutNft, "ether");
            pool.maxAllocationGuaranteedWithNft = this.web3Reader.utils.fromWei(pool.maxAllocationGuaranteedWithNft, "ether");
        }

        return pool;
    }

    getPools = async () => {
        await this.init();

        const pools = await this.oraculaReadContract.methods.getPools().call()
        let wrappedPools = [];
        if (pools) {
            const poolsLen = pools.length;
            for (let i = 0; i < poolsLen; i++) {
                let element = {
                minStakedZAM : this.web3Reader.utils.fromWei(pools[i].minStakedZAM, "ether"),
                allocationTotal : this.web3Reader.utils.fromWei(pools[i].allocationTotal, "ether"),
                allocationSold : this.web3Reader.utils.fromWei(pools[i].allocationSold, "ether"),
                usersWithoutNft : parseInt(pools[i].usersWithoutNft),
                usersWithNft : parseInt(pools[i].usersWithNft),
                maxAllocationGuaranteedWithoutNft : this.web3Reader.utils.fromWei(pools[i].maxAllocationGuaranteedWithoutNft, "ether"),
                maxAllocationGuaranteedWithNft : this.web3Reader.utils.fromWei(pools[i].maxAllocationGuaranteedWithNft, "ether")
                }
                wrappedPools.push(element);
            }
        }

        return wrappedPools;
    }

    getTokenBalance = async (wallet) => {
        await this.init();

        const balance = await this.tokenReadContract.methods.balanceOf(wallet.address).call();
        return this.web3Reader.utils.fromWei(balance, "ether");
    }

    verifyWallet = async (wallet) => {
        await this.init();

        try {
            const approveResult = await this.tokenWriteContract.methods
                .approve(OraculaAdress, Web3.utils.toWei(String(10000), "ether")).send({from: wallet.address});
            //console.log("approveResult = ", approveResult);

            return approveResult.status;
        } catch (error) {
            //console.log(error.message)
            this.errorAction.push(error.message);
            return false;
        }
    }

    joinWhitelist = async (wallet) => {
        await this.init();

        const nftCount = await this.getNftCount(wallet);
        //console.log("nftCount = ", nftCount);
        try {
            const approveResult = await this.tokenWriteContract.methods
                .approve(OraculaAdress, Web3.utils.toWei(String(10000), "ether")).send({from: wallet.address});
            //console.log("approveResult = ", approveResult);

            await this.oraculaWriteContract.methods.joinWhitelist(nftCount).send({from: wallet.address});
            const actualUser = await this.registeredUser(wallet);
            //console.log("actual registered user = ", actualUser);
            return actualUser;
        } catch (error) {
            //console.log("error = ", error);
            throw Error(error.message)
        }
    }

    participate = async (wallet, amount) => {
        await this.init();
        try {
            //console.log("amount = ", amount);
            await this.oraculaWriteContract.methods.participate(Web3.utils.toWei(String(amount), "ether")).send({from: wallet.address});
            return await this.registeredUser(wallet);
        } catch (error) {
            throw Error(error.message)
        }
    }
}
