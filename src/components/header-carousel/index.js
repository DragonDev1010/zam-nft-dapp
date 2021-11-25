import React from 'react';
import AliceCarousel from 'react-alice-carousel';

export const HeaderCarouselComponent = (props) => {
    const handleDragStart = (e) => e.preventDefault();

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <img alt="" src="/images/banners/banner_1.jpg" srcSet="/images/banners/banner_1.jpg 1x, /images/banners/banner_1-2x.jpg 2x" onDragStart={handleDragStart} role="presentation" />,
        <img alt="" src="/images/banners/banner_2.jpg" srcSet="/images/banners/banner_2.jpg 1x, /images/banners/banner_2-2x.jpg 2x" onDragStart={handleDragStart} role="presentation" />,
        <img alt="" src="/images/banners/banner_3.jpg" srcSet="/images/banners/banner_3.jpg 1x, /images/banners/banner_3-2x.jpg 2x" onDragStart={handleDragStart} role="presentation" />,
        <img alt="" src="/images/banners/banner_4.jpg" srcSet="/images/banners/banner_4.jpg 1x, /images/banners/banner_4-2x.jpg 2x" onDragStart={handleDragStart} role="presentation" />,
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
