import React from 'react';
import {HeaderCarouselComponent} from "@src/components/header-carousel";


export const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="header-container__item">
                    <p className="farming-container">
                        Our Completed Audits
                    </p>
                </div>
                <div className="header-container__item">
                    <HeaderCarouselComponent />
                </div>
            </div>
        </>
    )
};
