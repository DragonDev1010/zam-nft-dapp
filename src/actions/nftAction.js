import Web3 from "web3";
import contractZamStakingAbi from "@src/contracts/nft/nftContractAbi.json";
import { dec2hex, fromWei } from "@src/utils";
import { CHAIN_ID_BSC } from "../constants";
import contractZamBscAbi from "@src/contracts/bridge/zam_bsc.json";
import { ADDRESS_NFT, contractZamBscAddress } from "../config";

export class NftAction {
  constructor(wallet) {
    this.wallet = wallet;
    this.addressNft = ADDRESS_NFT;
    this.addressZam = contractZamBscAddress;
    this.errorAction = [];
    this.needChainId = 0;

    const web3 = new Web3(window.ethereum);
    this.nftContract = new web3.eth.Contract(contractZamStakingAbi, this.addressNft);
    this.zamTokenContract = new web3.eth.Contract(contractZamBscAbi, this.addressZam);
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

      const isAccountInWhitelist = await this.getWhiteListed();

      let isWhitelistedNftPrice = 0.18;

      if (isAccountInWhitelist) {
        isWhitelistedNftPrice = 0.15;
      }

      const nftsPrice = isWhitelistedNftPrice * amount;

      await this.nftContract.methods
        .mint(amount)
        .send({ from: this.wallet.address, value: Web3.utils.toWei(String(nftsPrice), "ether") });
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
