import React, {useContext, useState, useMemo} from 'react';
import {SelectComponent} from "@src/components/fields/Select";
import {NETWORK_BSC, NETWORK_ETH, NETWORKS, TOKEN_ZAM, TOKENS} from "@src/constants";
import {BridgeContext} from "@src/context";

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
    const {bridgeFrom, setBridgeFrom, bridgeTo, setBridgeTo} = useContext(BridgeContext);
    const [amount, setAmount] = useState(0);

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
            <div className="input-field mt-10">
                <div className="select-field select-field-transparent">
                    <div className="select-field__control">
                        <div className="select-field__token">
                            <img alt="" src={TOKENS[TOKEN_ZAM].icon} height="30px" width="30px"/>{TOKENS[TOKEN_ZAM].name}
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex mt-10 mb-40">
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
                            <img src="/images/icon_revert.svg" alt=""/>
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

            <label className="input-field__label">Amount</label>
            <div className="input-field mt-10 mb-10">
                <input className="input-field__input"
                       placeholder="Enter the amount"
                       onChange={(event) => setAmount(parseInt(event.target.value))}
                       value={amount || 0} placeholder="0"/>
            </div>
            <div className="bridge-switcher__amount-value mb-40">
                <span>Available for transaction:</span>
                <b>0 </b>
            </div>

            <button className="button-green w-full">
                Connect Wallet
            </button>
        </div>
    );
};
