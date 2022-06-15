import React from "react";

import { IDO_INFO } from "../info";

import { IDOInfoItem } from "./idoInfoItem";

export const IDOInfo = () => {
  return (
    <div className="ido-info">
      <div className="ido-info__title">IDO Info:</div>
      <ul className="ido-info__list">
        {IDO_INFO.length && IDO_INFO.map(({title, value}, index) => (
          <IDOInfoItem 
            key={Math.random(index)}
            title={title}
            value={value}
          />
        ))}
      </ul>
    </div>
  )
};
