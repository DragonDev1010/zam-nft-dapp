import React from 'react';

export const StakingCard = (props) => {
    return (
        <>
            <div style={{ background: props.background }} className="main-card-container">
                <div className="swap-card-header">
                    Staking ZAM Up to <span className="swap-card-header-span">89% APR</span>
                </div>
                <div style={{marginTop:"5.5em"}}>
                    <button className="main-card-button">
                        <div className="main-card-button-content">
                            {props.buttonContent}
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
};
