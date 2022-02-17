import React from "react";

export const Button = ({ title, className = "", onClick, disabled = false }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};
