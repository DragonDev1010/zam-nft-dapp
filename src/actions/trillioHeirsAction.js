import Web3 from "web3";
import nftContractAbi from "@src/contracts/nft/trillioHeirsABI.json"
import { TrillioHeirsAddress } from "../config/trillioHeirs"
import { CHAIN_ID_ETH, CHAIN_ID_RINKEBY, NETWORK_ETH } from "@src/constants";

export class TrillioHeirsAction {
    constructor(wallet, specialList = []) {
        this.contract = null;
        this.presaleResult = null;
        this.errorAction = [];
        this.wallet = wallet;
        this.specialList = specialList
    }

    init = async () => {
        if (this.contract !== null) {
            return;
        }

        const provider = await this.wallet.getProvider();
        const web3 = new Web3(provider);
        this.contract = new web3.eth.Contract(nftContractAbi, TrillioHeirsAddress);
    }

    getChainId = async () => {
        return await this.wallet.getChainId();
    }

    isPaused = async () => {
        await this.init();
        return await this.contract.methods.paused().call();
    }

    isPresale = async () => {
        await this.init();
        if (this.presaleResult !== null) {
            return this.presaleResult;
        }
        this.presaleResult = await this.contract.methods.presale().call();
        return this.presaleResult;
    }

    walletOfOwner = async () => {
        await this.init();
        try {
            if (!this.wallet.address) {
                return;
            }

            return await this.contract.methods.ownerOf(1).call();
        } catch (err) {
            this.errorAction.push(err.message);
        }
    };

    presaleMint = async (amount, minter, cost) => {
        await this.init();

        try {
            await this.checkWalletChain();

            if (!this.wallet.address) {
                throw new Error('Please connect your wallet');
            }

            const isSpecialUser = this.specialList.includes(this.wallet.address.toLowerCase())

            if (isSpecialUser) {
                return await this.contract.methods
                    .specialMint(amount)
                    .send({ from: minter, value: Web3.utils.toWei(String(cost), "ether") })
            }

            return await this.contract.methods
                .publicsaleMint(amount)
                .send({ from: minter, value: Web3.utils.toWei(String(cost), "ether") })

        } catch (error) {
            this.errorAction.push(error.message);
        }

    }

    getWalletBalance = async () => {
        await this.init();

        if (!this.wallet.address) {
            throw new Error('Please connect your wallet');
        }

        const web3 = new Web3(window.ethereum);

        const balance = await web3.eth.getBalance(this.wallet.address);
        return web3.utils.fromWei(balance, "ether");
    };

    checkWalletChain = async (needException = true) => {
        const chainId = await this.wallet.getChainId();

        if (chainId !== CHAIN_ID_ETH && chainId !== '0x01' && chainId !== CHAIN_ID_RINKEBY) {
            this.needChainId = NETWORK_ETH;
            const message = 'Please switch your wallet to Ethereum network.';
            this.errorAction.push(message);
            if (needException) {
                throw new Error(message);
            }
        }
    }
}
