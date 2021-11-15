import React from 'react';

export const BridgeCard = (props) => {
    return (
        <>
            <div style={{ background: props.background }} className="main-card-container">
                <div style={{ width: "100%" }} className="swap-card-header">
                    Bridge ZAM <span className="swap-card-header-span">ETH-BSC</span>
                </div>
                <div style={{ marginTop: "2em" }} className="swap-card-body bridge-card-body ">
                    <div className="swap-card-body-coins">
                        <img width="100%" style={{ marginRight: "-0.8em" }} src="../../../images/eth.svg" />
                        <img style={{ zIndex: "1" }} width="70%" src="../../../images/zam.svg" />
                    </div>
                    <div className="swap-card-body-text">
                        <img style={{marginBottom:"0.2em"}} src="../../../images/horizontal-line.svg" />
                    </div>
                    <div className="swap-card-body-coins">
                        <img style={{ zIndex: "1", marginRight: "-0.8em" }} width="70%" src="../../../images/zam.svg" />
                        <img width="100%" src="../../../images/busd.png" />
                    </div>
                </div>
                <div style={{marginTop:"1em"}}>
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
