import Web3 from "web3";
import nftContractAbi from "@src/contracts/nft/nftContractAbi.json";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import { ADDRESS_NFT, contractZamBscAddress } from "../config";
import {MerkleTree} from "merkletreejs"
import keccak256 from "keccak256"

export class NftAction {
  constructor(wallet) {
    this.wallet = wallet;
    this.addressNft = ADDRESS_NFT;
    this.addressZam = contractZamBscAddress;
    this.errorAction = [];
    this.needChainId = 0;

    const web3 = new Web3(window.ethereum);
    this.nftContract = new web3.eth.Contract(nftContractAbi, this.addressNft);
    this.zamTokenContract = new web3.eth.Contract(contractZamBscAbi, this.addressZam);

    const address_list = ["0x8C04e1707519cA28Bb73b008Cb9E1DA46Ecd6609", "0x5D5F5d0b95fCD20d3Fb837d6341Da4B0B02f224b", "0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E", "0x656947E79f546e011DB4d2b4b27135Fb46ccb9Fe"]
    this.leafNodes = address_list.map(addr => keccak256(addr))
    this.merkleTree_1 = new MerkleTree(this.leafNodes, keccak256, {sortPairs: true});
    this.merkleTree_2 = new MerkleTree(this.leafNodes, keccak256, {sortPairs: true});
    this.merkleTree_3 = new MerkleTree(this.leafNodes, keccak256, {sortPairs: true});
  }

  getWalletBalance = () => {
    const web3Instance = new Web3(window.ethereum);
    return new Promise((resolve, reject) => {
      web3Instance.eth.getBalance(this.wallet.address, (err, balance) => {
        if (err) {
          reject(new Error("Unable to retrieve balance for address: " + this.wallet.address));
        } else {
          resolve(web3Instance.utils.fromWei(balance, "ether"));
        }
      });
    });
  };

  mintNft = async (amount) => {
    try {
      await this.checkWalletConnection();

      console.log("getChainId", await this.getChainId());

      if (!this.wallet.address) {
        console.log("WALEET ERROR");
        return;
      }
      const root = this.merkleTree_1.getHexRoot()
      console.log("root: ", root)
      const proof = this.merkleTree_1.getHexProof(keccak256(this.wallet.address));
      console.log("proof: ", proof)
      if(proof.length != 0) {
        const nftsPrice = amount * 0.15
        await this.nftContract.methods
          .mint(amount, 1, proof)
          .send({ from: this.wallet.address, value: Web3.utils.toWei(String(nftsPrice), "ether") });
      } else {

      }
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };

  getWhiteListed = async () => {
    try {
      await this.checkWalletConnection();

      if (!this.wallet.address) {
        return;
      }

      const isWhiteListed = await this.nftContract.methods.whitelisted(this.wallet.address).call();

      return isWhiteListed;
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };
  getSecondLevel = async () => {
    try {
      await this.checkWalletConnection();

      if (!this.wallet.address) {
        return;
      }

      const secondLevel = await this.nftContract.methods.secondLevel(this.wallet.address).call();

      return secondLevel;
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };
  getThirdLevel = async () => {
    try {
      await this.checkWalletConnection();

      if (!this.wallet.address) {
        return;
      }

      const thirdLevel = await this.nftContract.methods.thirdLevel(this.wallet.address).call();

      return thirdLevel;
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };

  walletOfOwner = async () => {
    try {
      await this.checkWalletConnection();

      if (!this.wallet.address) {
        return;
      }

      const usersNfts = await this.nftContract.methods.walletOfOwner(this.wallet.address).call();

      return usersNfts;
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };

  tokenURI = async (tokenId) => {
    try {
      await this.checkWalletConnection();

      if (!this.wallet.address) {
        return;
      }

      const tokenURI = await this.nftContract.methods.tokenURI(tokenId).call();

      return tokenURI;
    } catch (err) {
      this.errorAction.push(err.message);
    }
  };

  checkWalletConnection = async () => {
    if (!this.wallet.address) {
      await this.wallet.checkConnection();
    }
  };

  getChainId = async () => {
    return await this.wallet.getChainId();
  };
}
