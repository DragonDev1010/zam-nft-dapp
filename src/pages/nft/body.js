import { TrillioHeirsAction } from "@src/actions/trillioHeirsAction";
import React, {useState, useEffect, useContext} from "react"
import { WalletContext } from "@src/context";
import {whitelist} from "../../whitelist_data/whitelist.js"


export const NftBody = () => {
    const NFTChainID = 4 // Rinkeby
    const { wallet, walletError, setWalletError } = useContext(WalletContext);

    const presaleMaxMintAmount = 10

    const [amount, setAmount] = useState(0)
    const [nftAction, setNftAction] = useState(null)
    const [chainId, setChainId] = useState(0)
    const [lvl, setLvl] = useState(0)
    const [remainForLvl, setRemainForLvl] = useState(0)
    const [cost, setCost] = useState(0)
    const [error, setError] = useState("")
    
    const presaleMintHandler = async() => {
        setError("")
        if (chainId !== NFTChainID) {
            setError("Switch Network into Ethereum!")
            return
        }
        if(amount > presaleMaxMintAmount) {
            let temp = "You can not mint more than " + presaleMaxMintAmount.toString() + " once"
            setError(temp)
            return
        }
        if (amount > remainForLvl) {
            let temp = "Level " + lvl.toString() + " has " + remainForLvl.toString() + " NFTs. You can mint at most " + remainForLvl.toString() + " NFTs."
            setError(temp)
            return
        }

        let addresses = []
        for (let i = 0 ; i < whitelist.length ; i++) {
            addresses.push(whitelist[i].wallet)
        }

        let tx = await nftAction.presaleMint(+amount, lvl, wallet.address, cost)
        console.log("Transaction: ", tx)
    }

    const amountInputHandler = (e) => {
        setAmount(e.target.value)
        setCost(e.target.value * 0.15)
    }

    const getNftAction = async () => {
        if (wallet !== null) {
            const action = new TrillioHeirsAction(wallet)
            setNftAction(action)
        }
    }

    const getChainId = async () => {
        if(nftAction !== null) {
            const chainId_ = await nftAction.getChainId()
            setChainId(parseInt(chainId_))
        }
    }

    const getLevel = async() => {
        if(wallet !== undefined) {
            for (let i = 0 ; i < whitelist.length ; i++) {
                if(wallet.address.toLowerCase() == whitelist[i].wallet.toLowerCase())
                    setLvl(whitelist[i].level)
            }
        }
    }

    const getRemainForLevel = async() => {
        if (nftAction !== null){
            let remain = await nftAction.getRemainForLevel(lvl)
            setRemainForLvl(remain)
        }
    }

    useEffect(() => {
        getNftAction()
        getChainId()
        getLevel()
    }, [wallet])

    useEffect(() => {
        getRemainForLevel()
    }, [nftAction, lvl])
    return (
        <>
            <p>{error}</p>
            <input value={amount} onChange={amountInputHandler}></input>
            <p>cost : {cost} ETH</p>
            <button onClick={presaleMintHandler}>Mint</button>
            {chainId}
            <p>level : {lvl}</p>
            <p>reamin for level: {remainForLvl}</p>
        </>
    )
}