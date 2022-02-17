import React from 'react';


export const SalesCardSmall = (props) => {

    return (
        <>
            <div className="small-card">
                <p className="small-card__staking">
                    Staking ZAM Up to
                    <br />
                    <span className="small-card__staking__span">89% APY</span>
                </p>
                <button className="small-card__button">
                    Stake ZAM
                </button>
            </div>
        </>
    )
};