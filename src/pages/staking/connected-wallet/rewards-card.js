import React, {useContext} from 'react';
import {numberFormat, toFixed} from "@src/utils";
import {StakingContext, WalletContext, ModalContext} from "@src/context";
import {StakingAction} from "@src/actions/stakingAction";


export const Rewards = () => {
    const {rewards} = useContext(StakingContext);
    const {wallet, setWalletError} = useContext(WalletContext);
    const {setModalNetworkOpen, setModalWalletOpen} = useContext(ModalContext);

    const claimRewards = async () => {
        const stakeAction = new StakingAction(wallet);
        await stakeAction.claimRewards();
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
                        {numberFormat(toFixed(rewards, 100))}
                    </div>
                </div>
                <div className="connect-wallet-button-container">
                    {
                        wallet?.address ?
                            rewards ?
                                <button className="button-green button-blue w-full" onClick={claimRewards}>
                                    Claim Rewards
                                </button>
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
