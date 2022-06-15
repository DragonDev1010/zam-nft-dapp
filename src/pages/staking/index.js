import React, {useContext, useState, useEffect} from 'react';
import {Header} from './header';
import {StakingBody} from './staking-body';
import {StakingContext} from "@src/context/staking-context";
import {WalletContext} from "@src/context";
import {StakingAction} from "@src/actions/stakingAction";
import {MetaTagsComponent} from "@src/components/metatags";

export const StakingPage = () => {
    const [apy, setApy] = useState(50);
    const [staked, setStaked] = useState(0);
    const [balance, setBalance] = useState(0);
    const [rewards, setRewards] = useState(0);
    const [totalRewards, setTotalRewards] = useState(0);
    const {wallet, setWalletError} = useContext(WalletContext);
    const [allowance, setAllowance] = useState(0);
    const [isPending, setIsPending] = useState();

    useEffect(async () => {
        const stakeAction = new StakingAction();
        const apy = await stakeAction.getApy();
        const totalRewards = await stakeAction.getTotalRewards();
        setApy(apy);
        setTotalRewards(totalRewards);
    }, []);

    useEffect(async () => {
        if (!isPending) {
            const stakeAction = new StakingAction(wallet);
            const reward = await stakeAction.getReward();
            const staked = await stakeAction.getStaked();
            const balanceResponse = await stakeAction.getBalance();

            setAllowance(balanceResponse?.allowance);
            setBalance(balanceResponse?.balance);
            setRewards(reward);
            setStaked(staked);
            setWalletError(stakeAction.errorAction);
        }
    }, [wallet, isPending]);


    return (
        <StakingContext.Provider value={{apy, staked, balance, rewards, totalRewards, allowance, isPending, setIsPending}}>
            <article className="staking background-glow">
                <MetaTagsComponent page="staking"/>

                <div className="general-container">
                    <Header/>
                    <StakingBody/>
                </div>
            </article>
        </StakingContext.Provider>
    )
};
