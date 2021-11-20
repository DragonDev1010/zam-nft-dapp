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
        <img src="images/farming/frame1_2x.png" srcSet="images/farming/frame1.png 1x, images/farming/frame1_2x.png 2x" onDragStart={handleDragStart} role="presentation" />,
        <img src="images/farming/frame2_2x.png" srcSet="images/farming/frame2.png 1x, images/farming/frame2_2x.png 2x" onDragStart={handleDragStart} role="presentation" />,
        <img src="images/farming/frame3_2x.png" srcSet="images/farming/frame3.png 1x, images/farming/frame3_2x.png 2x" onDragStart={handleDragStart} role="presentation" />,
    ];

    return (
        <>
            <div className="header-card-container hidden-sm">
                <AliceCarousel
                    infinite
                    autoPlayInterval="2000"
                    autoPlay
                    disableButtonsControls
                    responsive={responsive}
                    mouseTracking
                    items={items}
                />

            </div>
        </>
    )
};
