import React, {useContext, useState, useMemo} from 'react';
import {SelectComponent} from "@src/components/fields/Select";
import {TOKEN_ETH, TOKEN_ZAM, TOKENS} from "@src/constants";
import {SwapContext} from "@src/context";

const optionsTokens = [
    {
        value: TOKEN_ZAM,
        label: <div className="select-field__token">
            <img alt="" src={TOKENS[TOKEN_ZAM].icon} height="30px" width="30px"/>{TOKENS[TOKEN_ZAM].name}
        </div>
    },
    {
        value: TOKEN_ETH,
        label: <div className="select-field__token">
            <img alt="" src={TOKENS[TOKEN_ETH].icon} height="30px" width="30px"/>{TOKENS[TOKEN_ETH].name}
        </div>
    },
];

const getOptionByValue = (token) => optionsTokens[optionsTokens.findIndex(option => option.value === token)];

export const SwapSwitcher = () => {
    const {swapFrom, swapTo, setSwapFrom, setSwapTo} = useContext(SwapContext);
    const [valueFrom, setValueFrom] = useState(0);
    const [valueTo, setValueTo] = useState(0);
    const inputRefFrom = React.createRef();
    const inputRefTo = React.createRef();

    const handleChange = (option, type) => {

        if (type === 'from') {
            if (option.value === swapTo) {
                setSwapTo(swapFrom);
            }
            setSwapFrom(option.value);
        } else {
            if (option.value === swapFrom) {
                setSwapFrom(swapTo);
            }
            setSwapTo(option.value);
        }
    }

    const revertHandler = (event) => {
        event.preventDefault();
        setSwapFrom(swapTo);
        setSwapTo(swapFrom);
    }

    return (
        <div className="card card-narrow card-glow swap-switcher">
            <h3 className="title text-center mb-20">
                Swap
            </h3>

            <label className="input-field__label">From</label>
            <div className="input-field mt-10">
                <div className="input-field__column">
                    <SelectComponent
                        classNamePrefix="select-field"
                        className="select-field select-field-transparent"
                        onChange={(selectedOption) => handleChange(selectedOption, 'from')}
                        defaultValue={getOptionByValue(swapFrom)}
                        value={getOptionByValue(swapFrom)}
                        options={optionsTokens}
                    />
                </div>
                <div className="input-field__column">
                    <input className="input-field__input text-right"
                           ref={inputRefFrom}
                           onChange={(event) => setValueFrom(parseInt(event.target.value))}
                           value={valueFrom || ''} placeholder="0"/>
                </div>
                <div className="input-field__column input-field__column--token-name"
                     onClick={() => inputRefFrom.current.focus()}>
                    <div className="input-field__input">{TOKENS[swapFrom].name}</div>
                </div>

            </div>

            <div className="swap-switcher__revert mt-20">
                <a href="#" onClick={revertHandler}>
                    <img src="/images/icon_revert.svg" alt=""/>
                </a>
            </div>

            <label className="input-field__label">To (Estimated)</label>
            <div className="input-field mt-10">
                <div className="input-field__column">
                    <SelectComponent
                        classNamePrefix="select-field"
                        className="select-field select-field-transparent"
                        onChange={(selectedOption) => handleChange(selectedOption, 'to')}
                        defaultValue={getOptionByValue(swapTo)}
                        value={getOptionByValue(swapTo)}
                        options={optionsTokens}
                    />
                </div>
                <div className="input-field__column">
                    <input className="input-field__input text-right"
                           ref={inputRefTo}
                           onChange={(event) => setValueTo(parseInt(event.target.value))}
                           value={valueTo || ''} placeholder="0"/>
                </div>
                <div className="input-field__column input-field__column--token-name"
                     onClick={() => inputRefTo.current.focus()}>
                    <div className="input-field__input">{TOKENS[swapTo].name}</div>
                </div>
            </div>

            <div className="swap-switcher__rate">
                1 {TOKENS[swapFrom].name} ≈ 21.543634 {TOKENS[swapTo].name}
            </div>
            <button className="button-green w-full">
                Connect Wallet
            </button>
        </div>
    );
};
