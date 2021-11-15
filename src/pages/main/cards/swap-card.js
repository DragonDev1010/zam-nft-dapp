import React from 'react';

export const SwapCard = (props) => {
    return (
        <>
            <div style={{ background: props.background }} className="main-card-container">
                <div className="swap-card-header">
                    <span className="swap-card-header-span">Swap</span> ZAM token via DEX
                </div>
                <div className="swap-card-body">
                    <div className="swap-card-body-coins">
                        <img width="40%" style={{marginRight:"-0.8em",zIndex:"1"}} src="../../../images/zam.svg" />
                        <img width="40%" src="../../../images/usdt.svg" />
                    </div>
                    <div className="swap-card-body-text">
                        ZAM/USDT
                    </div>
                    <div>
                        <img width="90%" src="../../../images/rabbit.png" />
                    </div>
                </div>
                <div>
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
