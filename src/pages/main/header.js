import React from 'react';


export const Header = () => {


    return (
        <>
            <div className="header-container main-header-flex">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="farming-container header-title">
                        Universal Platform for DEconomy
                    </p>
                    <div className="header-title-body">
                        DeFi, NFT, GameFi, Launchpad.
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <img src="../../../images/main-header-card.png"/>
                </div>
            </div>
        </ >
    )
};