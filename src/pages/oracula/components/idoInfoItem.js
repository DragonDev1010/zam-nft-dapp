import React from 'react';

export const IDOInfoItem = ({ title, value }) => {

  let modifier = "";

  if (value.startsWith("+") || value.startsWith("↑")) {
    modifier = "ido-info__list-value_green"
  } else if (value.startsWith("-") || value.startsWith("↓")) {
    modifier = "ido-info__list-value_red"
  }

  return (
    <li className="ido-info__list-item">
      <div className="ido-info__list-content">
        <div className="ido-info__list-title">{title}</div>
        <div className={`ido-info__list-value ${modifier}`}>{value}</div>
      </div>
    </li>
  )
};