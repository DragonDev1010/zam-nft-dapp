import React from "react";

export const Round = ({ number, title, subtitle, status, isActive }) => {
  return (
    <div className="token-card__round">
      <div className="token-card__round-description">
        <div
          className={
            isActive
              ? "token-card__round-number active"
              : "token-card__round-number"
          }
        >
          {number}
        </div>
        <div className="token-card__round-info">
          <div className="token-card__round-title">{title}</div>
          <div className="token-card__round-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="token-card__round-status">{status}</div>
    </div>
  )
};
