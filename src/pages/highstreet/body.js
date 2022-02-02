import React from "react";
import Countdown from "react-countdown";
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from "@src/components/buttons/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Article } from "./article";
import { ARTICLES_INFO, ROUNDS_INFO, TOKENS_INFO } from "./info";
import { TokenInfo } from "./tokenInfo";
import { Round } from "./roundInfo";

export const Body = () => {
  const btnHandler = () => {
    console.log("BTN");
  };

  return (
    <>
      <div className="highstreet-body">
        <div className="highstreet-body__title-container">
          <div className="highstreet-body__title-container__image">
            <img src="images/zam-pad/hightstreet-container-title.svg" />
          </div>
          <div>
            <div className="highstreet-body__title-container__highstreet">
              <div className="highstreet-body__title-container__highstreet__title">
                <div className="highstreet-body__title-container__highstreet__title__h">Highstreet</div>
                <br />
                <div className="highstreet-body__title-container__highstreet__title__desc">
                  First Cross-Platform VR Metaverse on Solana
                </div>
              </div>
              <div className="highstreet-body__title-container__highstreet__title__icons">
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/discord.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/m.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/m2.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/gecko.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/homes.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/ethernet.svg"
                  />
                </a>
                <a href="https://google.com">
                  <img style={{ marginTop: "2.5%" }} src="images/zam-pad/twit.svg" />
                </a>
                <a href="https://google.com">
                  <img
                    className="highstreet-body__title-container__highstreet__title__icons__icon"
                    src="images/zam-pad/teleg.svg"
                  />
                </a>
                <div>
                  <button
                    style={{ margin: "1%" }}
                    className="highstreet-body__title-container__highstreet__title__icons__button"
                  >
                    <img src="images/zam-pad/info.svg" />
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="highstreet-body__title-container__desc">
              Solice elevates the metaverse experience to the next dimension by providing top-quality infrastructure,
              immersiveness, and life- <br />
              like visualizations
            </div>
          </div>
        </div>
        <div className="highstreet-body__cards">
          <div className="highstreet-body__cards__left">
            <div className="highstreet-body__cards__left__wrapper">
              <div className="highstreet-body__cards__left__bsc">
                <div className="highstreet-body__cards__left__bsc__header">
                  <div className="highstreet-body__cards__left__bsc__header__bsc">
                    <img src="images/zam-pad/bscc.svg" />
                    <div>BSC</div>
                  </div>
                  <div className="highstreet-body__cards__left__bsc__header__badges">
                    <div>P2Earn</div>
                    <div>Sale</div>
                  </div>
                </div>
                <div className="highstreet-body__cards__left__bsc__sale_timer">
                  <div className="highstreet-body__cards__left__bsc__sale-timer__title">Sale Ends In:</div>
                  <div className="highstreet-body__cards__left__bsc__sale-timer__timer">
                    {" "}
                    <Countdown date={Date.now() + 86400000} />
                  </div>
                </div>
                <div className="highstreet-body__cards__left__bsc__progress">
                  <div className="highstreet-body__cards__left__bsc__progress__title-wrapper ">
                    <div className="highstreet-body__cards__left__bsc__progress__title-wrapper__title">Total Raise</div>
                    <div className="highstreet-body__cards__left__bsc__progress__title-wrapper__currency">
                      {" "}
                      <img src="images/tokens/icon_token_usdt.svg" /> <span>3mln USDT</span>
                    </div>
                  </div>

                  <div className="highstreet-body__cards__left__bsc__progress__bar">
                    <ProgressBar completed={60} />
                  </div>
                  <div className="highstreet-body__cards__left__bsc__progress__stats">
                    <div className="highstreet-body__cards__left__bsc__progress__stats__procents">
                      65% <span>(Min. 52%)</span>
                    </div>
                    <div className="highstreet-body__cards__left__bsc__progress__stats__participants">
                      1 947 355/3 000 000
                    </div>
                  </div>
                </div>
                <div className="highstreet-body__cards__left__bsc__community">
                  <div className="highstreet-body__cards__left__bsc__community__score ">
                    <div className="highstreet-body__cards__left__bsc__community__title ">Community Score:</div>
                    <div className="highstreet-body__cards__left__bsc__community__score__qty ">
                      <img src="images/zam-pad/bscc.svg" /> <span>9.32/10</span>
                    </div>
                  </div>
                  <div className="highstreet-body__cards__left__bsc__community__access ">
                    <div className="highstreet-body__cards__left__bsc__community__title ">Access</div>
                    <div className="highstreet-body__cards__left__bsc__community__access__status ">Private</div>
                  </div>
                </div>
                <Button onClick={btnHandler} title="Connect wallet" />
              </div>
              <div className="highstreet-body__cards__left__rounds">
                <div className="highstreet-body__cards__left__rounds__title">IDO Process:</div>
                {ROUNDS_INFO.map(({ number, title, subtitle, status, isActive }) => (
                  <Round number={number} title={title} subtitle={subtitle} status={status} isActive={isActive} />
                ))}
              </div>
            </div>

            <div className="highstreet-body__cards__left__followers">
              <div className="highstreet-body__cards__left__followers__qty">
                <div className="highstreet-body__cards__left__followers__qty__number">29 547</div>
                <div className="highstreet-body__cards__left__followers__qty__title">Followers</div>
              </div>
              <div className="highstreet-body__cards__left__followers__slider">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={5}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {[...Array(30)].map((item, i) => (
                    <SwiperSlide key={i}>
                      <img src="images/highstreet/sliderImage.png" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="highstreet-body__cards__right">
            <div className="highstreet-body__cards__right__title">Key Token Metrics:</div>
            {TOKENS_INFO.map(({ title, subtitle, imgUrl, currency }) => (
              <TokenInfo title={title} subtitle={subtitle} imgUrl={imgUrl} currency={currency} />
            ))}
          </div>
        </div>
        <div className="highstreet-body__information">
          <div className="highstreet-body__information__tabs">
            {ARTICLES_INFO.map(({ title }) => (
              <div className="highstreet-body__information__tabs__title" onClick={() => goToSection(title)}>
                {title}
              </div>
            ))}
          </div>
          <div className="highstreet-body__information__articles">
            {ARTICLES_INFO.map(({ title, description, imgUrl }) => (
              <Article title={title} description={description} imgUrl={imgUrl} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
