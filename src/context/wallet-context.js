import React, {useEffect, useState} from 'react';
import {WalletFactory} from "@src/wallets/wallet-factory";

export const WalletContext = React.createContext();

export const walletContextProps = () => {
    const [wallet, setLocalWallet] = useState(WalletFactory.getWallet());
    const [walletError, setWalletError] = useState('');

    const checkWalletConnection = () =>
    {
        const address = wallet.address;
        wallet.checkConnection().then(async () => {
            if (wallet.address !== address) {
                wallet.checkConnection().then(() => {
                    setWallet(wallet);
                });
            }
        });
    }

    checkWalletConnection();

    const setWallet = (localWallet) => {
        setLocalWallet(localWallet.createFromRequest(localWallet));
    }

    useEffect(async () => {
        await addWalletListener();
    }, []);

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', async (address) => {
                wallet.address = address;
                setWallet(wallet);
                setWalletError('');
            });

            window.ethereum.on('chainChanged', handleChainChanged);
        }
        if (window.BinanceChain) {
            window.BinanceChain.on('accountsChanged', async (address) => {
                wallet.address = address;
                setWallet(wallet);
                setWalletError('');
            });
            window.BinanceChain.on('chainChanged', handleChainChanged);
        }
    }


    return {
        wallet,
        setWallet,
        walletError,
        setWalletError
    }
};


function handleChainChanged() {
    // recommended to reload the page
    window.location.reload();
}
