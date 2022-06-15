import React from "react";

export const OraculaButton = ({ title, disable = false, ...params }) => (
  <button
    {...params}
    disabled={disable}
    className={disable ? "button-disabled" : "button"}
  >
    {title}
  </button>
);
