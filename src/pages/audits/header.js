import React from 'react';
import { HeaderCarouselCard } from './header-carousel';
import {HeaderCard} from "@src/pages/farming/header-carousel";


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
                    <HeaderCard />
                </div>
            </div>
        </>
    )
};
