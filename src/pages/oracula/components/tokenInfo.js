import useWindowSize from "@src/hooks/useWindowSize";
import React, { useMemo } from "react";

export const TokenInfo = ({ title, subtitle, imgUrl = "", currency }) => {
  const { width } = useWindowSize();
  const cuttedTitle = useMemo(() => {
    if (width < 1450 && !/[a-zа-яё]/i.test(title)) {
      let str = title.slice(0, 5) + "K";
      return str;
    } else return title;
  }, [width]);
  return (
    <div className="token-info__item">
      <div className="token-info__title">
        {imgUrl && <img className="token-info__icon" src={imgUrl} />}
        <div className="token-info__cutted-title">{cuttedTitle}</div>
        <span className="token-info__currency">{currency}</span>
      </div>
      <div className="token-info__subtitle">{subtitle}</div>
    </div>
  );
};
