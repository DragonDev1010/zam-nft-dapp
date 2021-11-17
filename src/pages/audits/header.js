import React from 'react';
import { HeaderCarouselCard } from './header-carousel';


export const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="audits-header-title">
                    <p className="audits-header-container">
                        Our Completed Audits
                    </p>
                </div>
                <div className="audits-header-carousel">
                    <HeaderCarouselCard />
                </div>
            </div>
        </ >
    )
};