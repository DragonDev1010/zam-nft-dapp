import React from "react";
import cn from "classnames";

export const FilterStage = ({ title, activeFilter, handleFilter }) => {
  const active = activeFilter === title;

  return (
    <button
      className={cn("filters__button", { active })}
      onClick={() => handleFilter(title)}
    >
      {title}
    </button>
  );
};
