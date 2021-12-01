import React, {useContext, useState, useMemo, useEffect} from 'react';
import {SelectComponent} from "@src/components/fields/Select";
import {TOKEN_USDT, TOKEN_ZAM, TOKENS} from "@src/constants";
import {ModalContext, RateContext, SwapContext, WalletContext} from "@src/context";
import {float, toFixed, int} from "@src/utils";
import {SwapAction} from "@src/actions/swapAction";
import {IconArrowLeft, IconFilter} from "@src/icons/icons";
import {Tooltip} from "@src/components/fields/Tooltip";
import {ButtonSpinner} from "@src/components/buttons/button-spinner";
import Web3 from "web3";

const optionsTokens = [
    {
        value: TOKEN_ZAM,
        label: <div className="select-field__token">
            <img alt="" src={TOKENS[TOKEN_ZAM].icon} height="30px" width="30px"/>{TOKENS[TOKEN_ZAM].name}
        </div>
    },
    {
        value: TOKEN_USDT,
        label: <div className="select-field__token">
            <img alt="" src={TOKENS[TOKEN_USDT].icon} height="30px" width="30px"/>{TOKENS[TOKEN_USDT].name}
        </div>
    },
];

const getOptionByValue = (token) => optionsTokens[optionsTokens.findIndex(option => option.value === token)];

const defaultSlippage = .1;

const slippageText = `Slippage is when there is a price difference from the amount of the original market order and 
the actual price paid of a stock.`;
const deadlineText = `Your transaction will revert if it is pending for more than this long.`;

export const SwapSwitcher = ({mainToken}) => {
    const {rate} = useContext(RateContext);
    const {swapFrom, swapTo, setSwapFrom, setSwapTo, isPending, setIsPending} = useContext(SwapContext);
    const [valueFrom, setValueFrom] = useState();
    const [valueTo, setValueTo] = useState();
    const inputRefFrom = React.createRef();
    const inputRefTo = React.createRef();
    const {setModalWalletOpen, setModalNetworkOpen} = useContext(ModalContext);
    const {wallet, walletError, setWalletError} = useContext(WalletContext);
    const [lastInput, setLastInput] = useState('from');
    const [allowance, setAllowance] = useState({});
    const [filterActive, setFilterActive] = useState();
    const [slippage, setSlippage] = useState(defaultSlippage);
    const [deadline, setDeadline] = useState(30);

    useEffect(() => {
        return () => {
            setWalletError(null)
        }
    }, []);

    useEffect(async () => {
        if (!isPending) {
            const swap = new SwapAction(wallet, swapFrom, swapTo);
            const allowance = await swap.getAllowance();

            setAllowance(allowance);
            setWalletError(swap.errorAction);
        }
    }, [wallet, isPending]);

    useEffect(async () => {
        if (lastInput === 'from') {
            const swap = new SwapAction(wallet, swapFrom, swapTo);
            const amountB = await swap.getAmountB(valueFrom);
            setValueTo(amountB);
        } else if (lastInput === 'to') {
            const swap = new SwapAction(wallet, swapTo, swapFrom);
            const amountA = await swap.getAmountA(valueTo);
            setValueFrom(amountA);
        }
    }, [valueTo, valueFrom, swapFrom, swapTo])


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

    const changeValueFrom = (event) => {
        setValueFrom(event.target.value)
        setLastInput('from');
    }
    const changeValueTo = (event) => {
        setValueTo(event.target.value);
        setLastInput('to');
    }
    const approve = async () => {
        const swap = new SwapAction(wallet, swapFrom, swapTo);
        await swap.approve(setIsPending);
        setWalletError(swap.errorAction);
        setModalNetworkOpen(swap.needChainId);
    }
    const swapHandler = async () => {
        if (!valueFrom || !valueTo) {
            return;
        }
        const swap = new SwapAction(wallet, swapFrom, swapTo);
        await swap.swap(valueFrom, valueTo, setIsPending, slippage, deadline);
        setWalletError(swap.errorAction);
        setModalNetworkOpen(swap.needChainId);
    }

    let partAppove = null;

    if (allowance) {
        if (!Object.keys(allowance).length) {
            partAppove = null;
        } else if (!allowance.allowanceA && !allowance.allowanceB) {
            partAppove = 0;
        } else if (!allowance.allowanceA || !allowance.allowanceB) {
            partAppove = 1;
        } else {
            partAppove = 2;
        }
    }


    const setCustomSlippage = (e) => {
        const {value} = e.target;
        let parsedValue = value === '' ? defaultSlippage : float(value);
        if (parsedValue > 100) {
            parsedValue = 100;
        }
        setSlippage(parsedValue);
    }

    return (
        <>
            {
                !filterActive
                    ?
                    <div className="card card-filled card-narrow card-glow swap-switcher">
                        <button className="swap-switcher__settings" onClick={() => setFilterActive(true)}><IconFilter/>
                        </button>
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
                                       onChange={changeValueFrom}
                                       value={parseInt(valueFrom) || ''} placeholder="0"/>
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
                                       onChange={changeValueTo}
                                       value={parseInt(valueTo) || ''} placeholder="0"/>
                            </div>
                            <div className="input-field__column input-field__column--token-name"
                                 onClick={() => inputRefTo.current.focus()}>
                                <div className="input-field__input">{TOKENS[swapTo].name}</div>
                            </div>
                        </div>

                        <div className="swap-switcher__rate">
                            1 {TOKENS[swapFrom].name} ≈ {swapFrom === mainToken ? rate : toFixed(1 / rate)} {TOKENS[swapTo].name}
                        </div>

                        {
                            wallet?.address ?
                                (
                                    partAppove === 2 ?
                                        <ButtonSpinner className="button-green w-full"
                                                       onClick={swapHandler}
                                                       title={valueFrom && valueTo ? 'Swap' : 'Enter Amount'}
                                                       disabled={!valueFrom || !valueTo}
                                                       isPending={isPending}/>
                                        :
                                        (
                                            partAppove !== null ?
                                                <>
                                                    <div className="swap-switcher__approve">
                                                        <span>Approved progress:</span>
                                                        <span>{partAppove}/2</span>
                                                    </div>
                                                    <ButtonSpinner className="button-green w-full"
                                                                   onClick={approve}
                                                                   title="Approve"
                                                                   isPending={isPending}/>
                                                </>
                                                : ''
                                        )
                                )
                                :
                                <button className="button-green w-full" onClick={() => setModalWalletOpen(true)}>Connect
                                    Wallet</button>
                        }

                    </div>
                    :
                    <div className="card card-filled card-narrow card-glow swap-settings">
                        <div className="swap-settings__header">
                            <button className="swap-settings__arrow" onClick={() => setFilterActive(false)}>
                                <IconArrowLeft/>
                            </button>
                            <h3 className="title text-center mb-20">
                                Settings
                            </h3>
                        </div>

                        <div className="swap-settings__content">
                            <label className="input-field__label">Slippage Tolerance <Tooltip text={slippageText}/></label>
                            <div className="input-field mt-10 mb-40">
                                <div className="input-field__column buttons-switcher">
                                    <button className={slippage === .1 ? 'active' : ''}
                                            onClick={() => setSlippage(.1)}>0.1%
                                    </button>
                                </div>
                                <div className="input-field__column buttons-switcher">
                                    <button className={slippage === .5 ? 'active' : ''}
                                            onClick={() => setSlippage(.5)}>0.5%
                                    </button>
                                </div>
                                <div className="input-field__column buttons-switcher">
                                    <button className={slippage === 1 ? 'active' : ''}
                                            onClick={() => setSlippage(1)}>1%
                                    </button>
                                </div>
                                <div className="input-field__column ">
                                    <input className="input-field__input text-right buttons-switcher"
                                           onChange={setCustomSlippage}
                                           value={slippage && ![0.1, 0.5, 1].includes(slippage) ? float(slippage) : ''}
                                           placeholder="Custom"/>
                                </div>
                            </div>

                            <label className="input-field__label">Transaction Deadline <Tooltip text={deadlineText}/></label>
                            <div className="input-field mt-10">
                                <div className="input-field__column buttons-switcher">
                                    <input className="input-field__input"
                                           onChange={(e) => setDeadline(int(e.target.value))}
                                           value={deadline || ''}
                                           placeholder="Custom"/>
                                </div>
                                <div className="input-field__column text-right">
                                    <input className="input-field__input text-right buttons-switcher"
                                           disabled={true}
                                           placeholder="minutes"/>
                                </div>
                            </div>
                        </div>


                    </div>
            }
        </>
    );
};
