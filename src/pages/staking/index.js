import React from 'react';
import { Header } from './header';
import { StakingBody } from './staking-body';


export const StakingPage = () => {
    return (
        <article>
            <div className="general-container">
                <Header />
                <div className="staking-blocks">
                    <StakingBody />
                </div>
            </div>
        </article >
    )
};
