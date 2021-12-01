import React, {useEffect, useRef, useState} from 'react';
import {WalletFactory} from "@src/wallets/wallet-factory";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

export const WalletContext = React.createContext();

export const walletContextProps = () => {
    const res = useRef();
    if (!res.current) {
        res.current = WalletFactory.getWallet();
    }
    const [wallet, setLocalWallet] = useState(res.current);
    const [walletError, setWalletError] = useState('');

    useEffect(() => {
        const address = wallet.address;
        wallet.checkConnection().then(async () => {
            if (wallet.address !== address) {
                setWallet(wallet);
            }
        });
    }, [wallet]);

    const setWallet = (localWallet) => {
        setLocalWallet(localWallet.createFromRequest(localWallet));
    }

    useEffect(async () => {
        await addWalletListener();
    }, [wallet]);

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', async (address) => {
                wallet.address = address;
                setWallet(wallet);
                setWalletError('');
            });

            window.ethereum.on('chainChanged', async (chainId) => {
                setWallet(wallet);
                setWalletError('');
            });
        }
        if (window.BinanceChain) {
            window.BinanceChain.on('accountsChanged', async (address) => {
                wallet.address = address;
                setWallet(wallet);
                setWalletError('');
            });
            window.BinanceChain.on('chainChanged', async (chainId) => {
                setWallet(wallet);
                setWalletError('');
            });
        }
    }


    return {
        wallet,
        setWallet,
        walletError,
        setWalletError
    }
};



