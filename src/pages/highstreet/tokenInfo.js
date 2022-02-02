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
    <div className="highstreet-body__cards__right__token">
      <div className="highstreet-body__cards__right__token__title">
        {imgUrl && <img src={imgUrl} />}
        <div>{cuttedTitle}</div>
        <span>{currency}</span>
      </div>
      <div className="highstreet-body__cards__right__token__subtitle">{subtitle}</div>
    </div>
  );
};
