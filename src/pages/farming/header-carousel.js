import React from 'react';
import AliceCarousel from 'react-alice-carousel';

export const HeaderCard = (props) => {
    const handleDragStart = (e) => e.preventDefault();

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <img src="../../../images/frame1.png" onDragStart={handleDragStart} role="presentation" />,
        <img src="../../../images/frame2.png" onDragStart={handleDragStart} role="presentation" />,
        <img src="../../../images/frame3.png" onDragStart={handleDragStart} role="presentation" />,
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
