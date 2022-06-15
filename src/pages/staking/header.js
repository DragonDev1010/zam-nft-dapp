import React from 'react';
import {HeaderCarouselComponent} from "@src/components/header-carousel";


export const Header = () => {

    return (
        <>
            <div className="header-container">
                <div className="header-container__item">
                    <p className="farming-container">
                        Stake ZAM, Earn ZAM
                    </p>
                    <p className="header-earn-container">
                        You can now stake your ZAM tokens and earn rewards in ZAM.
                    </p>
                    <p className="header-earn-container">
                        Only <span className="earn-span">BEP20 ZAM.</span>
                    </p>
                </div>
                <div className="header-container__item">
                    <HeaderCarouselComponent/>
                </div>
            </div>
        </ >
    )
};
