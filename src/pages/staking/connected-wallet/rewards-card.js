import React, {useContext} from 'react';
import {numberFormat, toFixed} from "@src/utils";
import {StakingContext, WalletContext, ModalContext} from "@src/context";
import {StakingAction} from "@src/actions/stakingAction";
import {ButtonSpinner} from "@src/components/buttons/button-spinner";


export const Rewards = () => {
    const {rewards, isPending, setIsPending} = useContext(StakingContext);
    const {wallet, setWalletError} = useContext(WalletContext);
    const {setModalNetworkOpen, setModalWalletOpen} = useContext(ModalContext);

    const claimRewards = async () => {
        const stakeAction = new StakingAction(wallet);
        await stakeAction.claimRewards(setIsPending);
        setWalletError(stakeAction.errorAction);
        setModalNetworkOpen(stakeAction.needChainId);
    }

    return (
        <div className="card card-narrow card-filled">
            <div className="stake-zam-container">
                <div className="stake-zam-container-header">
                    Your Rewards
                </div>
                <div className="rewards-body-card mb-40">
                    <div className="rewards-body-card-value">
                        {numberFormat(toFixed(rewards, 2))}
                    </div>
                </div>
                <div className="connect-wallet-button-container">
                    {
                        wallet?.address ?
                            rewards ?
                                <ButtonSpinner className="button-green button-blue w-full"
                                               onClick={claimRewards}
                                               title="Claim Rewards"
                                               isPending={isPending}/>
                                : ''
                            :
                            <button className="button-green w-full" onClick={() => setModalWalletOpen(true)}>Connect
                                Wallet</button>
                    }
                </div>
            </div>
        </div>
    )
};
