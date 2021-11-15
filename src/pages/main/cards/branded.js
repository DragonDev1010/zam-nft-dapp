import React from 'react';

export const BrandedCard = (props) => {
    return (
        <>
            <div className="main-card-container">
                <div style={{ width: "60%" }} className="swap-card-header">
                    <span className="swap-card-header-span">Branded NFTs</span> from Zamio Team
                </div>
                <img style={{ marginLeft: "1.4em" }} src="../../../images/soon.svg" />
                <div className="swap-card-body">
                    <img width="37%" src="../../../images/box.svg" />
                </div>
            </div>
        </>
    )
};
