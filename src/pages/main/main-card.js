import React from 'react';

export const MainCard = (props) => {
    return (
        <>
            <div style={{ background: props.background }} className="main-card-container">
                {props.isEnableTitle && <div style={{ width: "65%" }} className="swap-card-header">
                    Create  <span className="swap-card-header-span">DeFi Wallet</span> in ZamWallet
                </div>}
                {props.isEnableButton && <div>
                    <button className="main-card-button">
                        <div className="main-card-button-content">
                            {props.buttonContent}
                        </div>
                    </button>
                </div>}
            </div>
        </>
    )
};
