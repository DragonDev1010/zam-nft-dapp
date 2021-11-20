import React from 'react';
import AliceCarousel from 'react-alice-carousel';

export const HeaderCarouselCard = (props) => {
    const handleDragStart = (e) => e.preventDefault();

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <img src="../../../images/zam-usdt.svg" onDragStart={handleDragStart} role="presentation" />,
        <img src="../../../images/audit-defi-wallet.png" onDragStart={handleDragStart} role="presentation" />,
        <img src="../../../images/audits-staking-zam.png" onDragStart={handleDragStart} role="presentation" />,
    ];

    return (
        <>
            <div style={{ width: "1000px"}} className="header-card-container">
                <AliceCarousel
                    infinite="true"
                    mouseTracking="true"
                    autoPlayInterval="2000"
                    autoPlay="true"
                    disableButtonsControls="true"
                    responsive={responsive}
                    mouseTracking items={items} />

            </div>
        </>
    )
};
