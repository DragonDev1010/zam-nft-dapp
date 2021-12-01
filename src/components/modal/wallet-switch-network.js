import React, {useEffect, useState, useContext} from 'react';
import {NETWORK_NAMES, NETWORKS} from "@src/constants";
import {ModalContext, WalletContext} from "@src/context";


export const ModalSwitchNetwork = (props) => {
    const {wallet} = useContext(WalletContext);
    const {setWarningOpen} = useContext(ModalContext);

    const switchNetwork = () => {
        const {chainId, rpcUrl} = NETWORKS[props.targetNetwork];
        props.onClose();

        try {
            wallet.switchNetwork(chainId[0], rpcUrl);
        } catch (error) {
            setWarningOpen(error.message)
        }
    }
    return (
        <div className="modal__network">
            <h4>Switch Wallet Network</h4>

            <p className="mt-20 mb-20">
                The {NETWORK_NAMES[props.targetNetwork]} is required to process this action.
                <br/>
                Please switch the network and try again.
            </p>

            <div className="button-outlines justify-center">
                <button className="button-outline" onClick={switchNetwork}>
                    <img className="button-outline__icon" src={NETWORKS[props.targetNetwork].icon}/>
                    Switch to {NETWORKS[props.targetNetwork].name}
                </button>
            </div>

            <div className="flex justify-center">
                <span className="gray-link close-link" onClick={props.onClose}>Close</span>
            </div>
        </div>
    );
}
