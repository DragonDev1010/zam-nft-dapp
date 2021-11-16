import React from 'react';
import { HeaderCard } from '../farming/header-carousel';


export const Header = () => {

    const onClickButton = () => {

    }
    return (
        <>
            <div className="staking-header-general-container">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="header-staking-container">
                        Stake ZAM, Earn ZAM
                    </p>
                    <p className="header-earn-container">
                        You can now stake your ZAM tokens and earn rewards in ZAM.
                    </p>
                    <p className="header-earn-container">
                        Only <span className="earn-span">BEP20 ZAM.</span>
                    </p>

                </div>
                <div className="slider-container">
                    <HeaderCard />
                </div>
            </div>
        </ >
    )
};
