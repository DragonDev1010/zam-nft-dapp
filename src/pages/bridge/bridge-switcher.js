import React, {useContext, useState, useMemo, useEffect} from 'react';
import {SelectComponent} from "@src/components/fields/Select";
import {NETWORK_BSC, NETWORK_ETH, NETWORKS, SWAP_BSC_ETH, SWAP_ETH_BSC, TOKEN_ZAM, TOKENS} from "@src/constants";
import {BridgeContext, ModalWalletContext, WalletContext} from "@src/context";
import {bridgeAction} from "@src/actions/bridgeAction";

const optionsNetworks = [
    {
        value: NETWORK_ETH,
        label: <div className="select-field__token">
            <img alt="" src={NETWORKS[NETWORK_ETH].icon} height="30px" width="30px"/>{NETWORKS[NETWORK_ETH].name}
        </div>
    },
    {
        value: NETWORK_BSC,
        label: <div className="select-field__token">
            <img alt="" src={NETWORKS[NETWORK_BSC].icon} height="30px" width="30px"/>{NETWORKS[NETWORK_BSC].name}
        </div>
    },
];

const getOptionByValue = (token) => optionsNetworks[optionsNetworks.findIndex(option => option.value === token)];

export const BridgeSwitcher = () => {
    const {setModalOpen} = useContext(ModalWalletContext);
    const {wallet, setWalletError} = useContext(WalletContext);

    const {bridgeFrom, setBridgeFrom, bridgeTo, setBridgeTo, swapMethod, setSwapMethod} = useContext(BridgeContext);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        return () => {
            setWalletError(null)
        }
    }, []);

    useEffect(async () => {
        const bridge = new bridgeAction(wallet, swapMethod);
        await bridge.getBalance();

        setWalletError(bridge.error)
    }, [swapMethod]);


    useEffect(() => {
        if (bridgeFrom === NETWORK_ETH) {
            setSwapMethod(SWAP_ETH_BSC);
        } else {
            setSwapMethod(SWAP_BSC_ETH);
        }
    }, [bridgeFrom]);


    const handleChange = (option, type) => {

        if (type === 'from') {
            if (option.value === bridgeTo) {
                setBridgeTo(bridgeFrom);
            }
            setBridgeFrom(option.value);
        } else {
            if (option.value === bridgeFrom) {
                setBridgeFrom(bridgeTo);
            }
            setBridgeTo(option.value);
        }
    }


    async function approve() {
        const bridge = new bridgeAction(wallet, swapMethod);
        await bridge.approve();

        setWalletError(bridge.error);
    }

    async function transfer() {
        const bridge = new bridgeAction(wallet, swapMethod);
        await bridge.transfer(amount);

        setWalletError(bridge.error);
    }

    const revertHandler = (event) => {
        event.preventDefault();
        setBridgeFrom(bridgeTo);
        setBridgeTo(bridgeFrom);
    }

    return (
        <div className="card card-narrow card-glow bridge-switcher">
            <h3 className="title text-center mb-20">
                Zamio bridge
            </h3>

            <label className="input-field__label">Asset</label>
            <div className="input-field mt-10 mb-40">
                <div className="select-field select-field-transparent">
                    <div className="select-field__control">
                        <div className="select-field__token">
                            <img alt="" src={TOKENS[TOKEN_ZAM].icon} height="30px"
                                 width="30px"/>{TOKENS[TOKEN_ZAM].name}
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex mt-10 mb-40 bridge-switcher__inputs">
                <div className="input-field__column">
                    <label className="input-field__label">From</label>
                    <div className="input-field mt-10 select-field__token-v">
                        <SelectComponent
                            classNamePrefix="select-field"
                            className="select-field select-field-transparent"
                            onChange={(selectedOption) => handleChange(selectedOption, 'from')}
                            defaultValue={getOptionByValue(bridgeFrom)}
                            value={getOptionByValue(bridgeFrom)}
                            options={optionsNetworks}
                        />
                    </div>
                </div>
                <div className="input-field__column input-field__column--revert">
                    <a href="#" onClick={revertHandler}>
                        <img src="images/icon_revert.svg" alt=""/>
                    </a>
                </div>
                <div className="input-field__column">
                    <label className="input-field__label">To</label>
                    <div className="input-field mt-10 select-field__token-v">
                        <SelectComponent
                            classNamePrefix="select-field"
                            className="select-field select-field-transparent"
                            onChange={(selectedOption) => handleChange(selectedOption, 'to')}
                            defaultValue={getOptionByValue(bridgeTo)}
                            value={getOptionByValue(bridgeTo)}
                            options={optionsNetworks}
                        />
                    </div>
                </div>
            </div>


            {
                wallet?.address && wallet.allowance > 0 ?
                    <>
                        <label className="input-field__label">Amount</label>
                        <div className="input-field mt-10 mb-10">
                            <input className="input-field__input"
                                   onChange={(event) => setAmount(parseInt(event.target.value))}
                                   value={amount || 0} placeholder="0"/>
                        </div>
                    </>
                    : ''
            }

            {
                wallet?.address ? (
                    <div className="bridge-switcher__amount-value mb-10">
                        <span>Available for transaction:</span>
                        <b>{wallet.balance}</b>
                    </div>
                ) : <div className="mb-40"/>
            }


            {
                !wallet.error ?
                    wallet?.address ?
                        wallet.allowance > 0 ?
                            <button className="button-green w-full" onClick={transfer}>Transfer</button>
                            :
                            <button className="button-green w-full" onClick={approve}>Approve</button>
                        :
                        <button className="button-green w-full" onClick={() => setModalOpen(true)}>Connect
                            Wallet</button>
                    : ''
            }


        </div>
    );
};
