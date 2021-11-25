import React from 'react';
import {useState, useContext} from 'react';
import {IconCalculator} from "@src/icons/icons";
import {ModalContext, WalletContext, StakingContext} from "@src/context";
import {float, numberFormat, toFixed} from "@src/utils";
import {StakingAction} from "@src/actions/stakingAction";

export const StakingZam = ({setCalculatorActive}) => {
    const [toStakeValue, setToStakeValue] = useState(0);
    const [toUnStakeValue, setToUnStakeValue] = useState(0);
    const [action, setAction] = useState('stake');
    const {setModalWalletOpen, setModalNetworkOpen} = useContext(ModalContext);
    const {wallet, walletError, setWalletError} = useContext(WalletContext);
    const {staked, balance, allowance} = useContext(StakingContext);

    const value = (action === 'stake') ? toStakeValue : toUnStakeValue;

    const approve = async () => {
        const stakeAction = new StakingAction(wallet);
        await stakeAction.approve();
        setWalletError(stakeAction.errorAction);
        setModalNetworkOpen(stakeAction.needChainId);
    }

    const setAmount = (e) => {
        const value = float(e.target.value);
        setAmountValue(value);
    }

    const setAmountValue = (value) => {
        if (action === 'stake') {
            setToStakeValue(value > balance ? toFixed(balance, 100) : value);
        } else if (action === 'unstake') {
            setToUnStakeValue(value > staked ? toFixed(staked, 100) : value);
        }
    }

    const stakeAction = async () => {
        const stakeAction = new StakingAction(wallet);
        await stakeAction.stakeOrUnstake(action, toStakeValue, toUnStakeValue);

        setWalletError(stakeAction.errorAction);
        setModalNetworkOpen(stakeAction.needChainId);
    }

    return (
        <>
            <button className="swap-switcher__settings" onClick={() => setCalculatorActive(true)}><IconCalculator/>
            </button>

            {
                !wallet?.address
                    ?
                    <h3 className="title text-center mb-20 mt-20">
                        Stake ZAM
                    </h3>
                    :
                    <div className="input-field mb-40 staking__switcher">
                        <div className="input-field__column buttons-switcher">
                            <button className={action === 'stake' ? 'active' : ''}
                                    onClick={() => setAction('stake')}>Stake
                            </button>
                        </div>
                        <div className="input-field__column buttons-switcher">
                            <button className={action === 'unstake' ? 'active' : ''}
                                    onClick={() => setAction('unstake')}>Unstake
                            </button>
                        </div>
                    </div>
            }


            <div className="filed-container-title mt-20">
                <div>{action === 'stake' ? 'Stake' : 'Unstake'} ZAM <span className="field-container-title-span">BEP20</span></div>
                {
                    action === 'stake' ?
                        <div>Available for stake: {numberFormat(toFixed(balance, 100))}</div>
                        :  <div>Available for unstake: {numberFormat(toFixed(staked, 100))}</div>

                }
            </div>
            {
                allowance > 0 || !wallet?.address
                    ?
                    <div className="input-field mt-10  mb-40">
                        <div className="input-field__column">
                            <input className="input-field__input text-left"
                                   onChange={setAmount}
                                   value={value || ''} placeholder="0"/>
                        </div>
                        <div className="input-field__column input-field__column--token-name">
                            <div style={{justifyContent: "flex-end"}} className="input-field__input flex-end">
                                <div className="zam-token-name">
                                    ZAM
                                </div>
                                <button onClick={() => setAmountValue(toFixed(action === 'stake' ? balance : staked, 100))}
                                        className="max-button">Max
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mb-40"/>
            }

            {
                wallet?.address ?
                    allowance > 0 ?
                        <button className="button-green button-blue w-full" disabled={!value} onClick={stakeAction}>
                            {
                                !value
                                    ? 'Enter Amount'
                                    : action === 'stake' ? 'Stake' : 'Unstake'
                            }
                        </button>
                        :
                        <button className="button-green button-blue w-full" onClick={approve}>
                            Approve
                        </button>
                    :
                    <button className="button-green button-blue w-full" onClick={() => setModalWalletOpen(true)}>
                        Connect Wallet
                    </button>
            }

        </>
    )
};
