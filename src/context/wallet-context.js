import React, {useEffect, useState} from 'react';
import {WalletFactory} from "@src/wallets/wallet-factory";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";

export const WalletContext = React.createContext();

export const walletContextProps = () => {
    const [wallet, setLocalWallet] = useState(WalletFactory.getWallet());
    const [walletError, setWalletError] = useState('');

    const checkWalletConnection = async () =>
    {
        const address = wallet.address;
        wallet.checkConnection().then(async () => {
            if (wallet.address !== address) {
                    setWallet(wallet);
            }
        });
    }

    useEffect(() => {
        checkWalletConnection();
    }, []);


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



