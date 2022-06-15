import React from "react";

import { STAGES_INFO } from "../info";

import { FilterStage } from "./filterStage";

export const Filters = ({ activeFilter, handleFilter }) => {
  return (
    <div className="filters">
      {STAGES_INFO.length &&
        STAGES_INFO.map((item) => (
          <FilterStage
            {...item}
            key={item.title}
            activeFilter={activeFilter}
            handleFilter={handleFilter}
          />
        ))}
    </div>
  );
};
