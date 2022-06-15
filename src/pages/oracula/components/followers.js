import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/autoplay";

export const Followers = () => {
  return (
    <div className="token-followers highstreet-body__cards-followers">
      <div className="token-followers__count">
        <div className="token-followers__count-number">29 547</div>
        <div className="token-followers__count-title">Followers</div>
      </div>
      <div className="token-followers__slider">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={9}
          slidesPerView={"auto"}
          autoplay={{delay: 0}}
          speed={3000}
          loop={true}
        >
          {[...Array(30)].map((item, i) => (
            <SwiperSlide key={i}>
              <div className="token-followers__img-wrapper">
                  <img src="images/highstreet/sliderImage.png" className="token-followers__img"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
};