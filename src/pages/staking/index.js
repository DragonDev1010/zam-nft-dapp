import React, {useContext, useState, useEffect} from 'react';
import {Header} from './header';
import {StakingBody} from './staking-body';
import {StakingContext} from "@src/context/staking-context";
import {ModalContext, WalletContext} from "@src/context";
import {StakingAction} from "@src/actions/stakingAction";
import {Modal} from "@src/components/modal/modal";
import {ModalSwitchNetwork} from "@src/components/modal/wallet-switch-network";


export const StakingPage = () => {
    const [apy, setApy] = useState(50);
    const [staked, setStaked] = useState(0);
    const [balance, setBalance] = useState(0);
    const [rewards, setRewards] = useState(0);
    const {wallet, walletError, setWalletError} = useContext(WalletContext);
    const [allowance, setAllowance] = useState(0);

    useEffect(async () => {
        const stakeAction = new StakingAction();
        const apy = await stakeAction.getApy();
        setApy(apy);
    }, []);

    useEffect(async () => {
        const stakeAction = new StakingAction(wallet);
        const reward = await stakeAction.getReward();
        const staked = await stakeAction.getStaked();
        const balanceResponse = await stakeAction.getBalance();

        setAllowance(balanceResponse?.allowance);
        setBalance(balanceResponse?.balance);
        setRewards(reward);
        setStaked(staked);
        setWalletError(stakeAction.errorAction);
    }, [wallet]);


    return (
        <StakingContext.Provider value={{apy, staked, balance, rewards, allowance}}>
            <article className="staking background-glow">
                <div className="general-container">
                    <Header/>
                    <StakingBody/>
                </div>
            </article>
        </StakingContext.Provider>
    )
};
