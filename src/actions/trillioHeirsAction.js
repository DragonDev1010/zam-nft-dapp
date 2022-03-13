import Web3 from "web3";
import nftContractAbi from "@src/contracts/nft/trillioHeirsABI.json"
import {TrillioHeirsAddress} from "../config/trillioHeirs"
import {whitelist} from "../whitelist_data/whitelist"
import {MerkleTree} from "merkletreejs"
import keccak256 from "keccak256"

export class TrillioHeirsAction {
    constructor(wallet) {
        this.wallet = wallet;
        const web3 = new Web3(window.ethereum);
        this.contract = new web3.eth.Contract(nftContractAbi, TrillioHeirsAddress);

        let addresses = []
        for(let i = 0 ; i < whitelist.length ; i++)
            addresses.push(whitelist[i].wallet)
        let leafNodes = addresses.map(item => keccak256(item))
        this.merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
    }

    getChainId = async () => {
        return await this.wallet.getChainId();
    }

    getRemainForLevel = async(lvl) => {
        let maxMint, mintedAmount
        if (lvl == 1) {
            maxMint = await this.contract.methods.maxMint_1().call()
            mintedAmount = await this.contract.methods.mintedAmount_1().call()
        } else if (lvl == 2) {
            maxMint = await this.contract.methods.maxMint_2().call()
            mintedAmount = await this.contract.methods.mintedAmount_2().call()
        } else if (lvl == 3) {
            maxMint = await this.contract.methods.maxMint_3().call()
            mintedAmount = await this.contract.methods.mintedAmount_3().call()
        } else {
            return 0
        }
        return (parseInt(maxMint) - parseInt(mintedAmount))
    }

    presaleMint = async(amount, lvl, minter, cost) => {
        try {
            const proof = this.merkleTree.getHexProof(keccak256(this.wallet.address));

            console.log(amount, lvl, proof, minter, cost)
            let tx = await this.contract.methods.presaleMint(amount, lvl, proof).send({from: minter, value: Web3.utils.toWei(String(cost), "ether")})
    
            return tx
        } catch (error) {
            
        }

    }
}