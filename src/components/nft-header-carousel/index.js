import React from 'react';
import AliceCarousel from 'react-alice-carousel';

export const NftHeaderCarouselComponent = (props) => {
    const handleDragStart = (e) => e.preventDefault();

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 6 },
    };

    const items = [
        <img alt="" src="./images/nft/banners/nft-banner-1.png" srcSet="./images/nft/banners/nft-banner-1.png 1x, ./images/nft/banners/nft-banner-1-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
        <img alt="" src="./images/nft/banners/nft-banner-2.png" srcSet="./images/nft/banners/nft-banner-2.png 1x, ./images/nft/banners/nft-banner-2-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
        <img alt="" src="./images/nft/banners/nft-banner-3.png" srcSet="./images/nft/banners/nft-banner-3.png 1x, ./images/nft/banners/nft-banner-3-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
        <img alt="" src="./images/nft/banners/nft-banner-4.png" srcSet="./images/nft/banners/nft-banner-4.png 1x, ./images/nft/banners/nft-banner-4-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
        <img alt="" src="./images/nft/banners/nft-banner-5.png" srcSet="./images/nft/banners/nft-banner-5.png 1x, ./images/nft/banners/nft-banner-5-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
        <img alt="" src="./images/nft/banners/nft-banner-6.png" srcSet="./images/nft/banners/nft-banner-6.png 1x, ./images/nft/banners/nft-banner-6-x2.png 2x" onDragStart={handleDragStart} role="presentation" style={{width: "90%", height:"187px", margin: "0 15px"}} />,
    ];

    return (
        <>
            <div style={{ marginBottom: "3%" }} className="header-card-container hidden-sm">
                <AliceCarousel
                    infinite
                    // autoPlayInterval="2000"
                    // autoPlay
                    disableButtonsControls
                    responsive={responsive}
                    mouseTracking
                    items={items}
                />

            </div>
        </>
    )
};
