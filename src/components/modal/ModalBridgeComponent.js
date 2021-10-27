import React, {useRef, useEffect, useState, useContext} from 'react';
import {BridgeContext} from "../bridge/BridgeContext";
import {ProviderFactory} from "../../utils/ProviderFactory";

export const ModalBridgeComponent = (props) => {
    const ref = useRef(null);
    const refOutside = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    let {setWallet, setWalletType, setBalance, setAllowance, swapMethod} = useContext(BridgeContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.onClose();
                setErrorMessage('');
            }
        }

        if (props.isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [props.isOpen]);

    const connectWallet = async (addressType) => {

        const provider = ProviderFactory.getProvider(addressType);
        await provider.connect(swapMethod);

        setErrorMessage(provider.error);
        if (provider.address) {
            localStorage.setItem('address', provider.address);
            localStorage.setItem('addressType', addressType);

            setWallet(provider.address);
            setWalletType(addressType);
            setBalance(provider.balance);
            setAllowance(provider.allowance);
            props.onClose();
            setErrorMessage('');

            window.location.reload();
        }
    };

    return (
        <div className="modal" style={{display: props.isOpen ? 'block' : 'none'}}>
            <div className="modal__overlay" ref={refOutside}>
                <div className="modal__bridge" ref={ref}>
                    <h4>Wallet Connection</h4>

                    <div className="modal__content">
                        <div className="wallet" onClick={() => connectWallet('metamask')}>
                            <div className="wallet__content">
                                <img src="images/icon_metamask.svg" alt="wallet" className="wallet__image"/>
                                <span className="wallet__name">Metamask</span>
                            </div>
                        </div>
                        <div className="wallet" onClick={() => connectWallet('binance')}>
                            <div className="wallet__content">
                                <img src="images/icon_token_bsc.svg" alt="wallet" className="wallet__image"/>
                                <span className="wallet__name">Binance Wallet</span>
                            </div>
                        </div>
                    </div>

                    {
                        errorMessage ? (
                            <div className="modal__error">{errorMessage}</div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
);
}
