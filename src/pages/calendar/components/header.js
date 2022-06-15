import React from "react";

import { Search } from "./search";
import { Filters } from "./filters";
import { ProjectTypes } from "./projectTypes";

export const Header = ({
  activeFilter,
  handleFilter,
  onUpdateSearchTerm,
  setActiveTypes,
  activeTypes,
}) => {
  return (
    <div className="calendar__head">
      <div className="calendar__top">
        <h2 className="calendar__title">Projects Calendar</h2>
        <div className="calendar__search">
          <Search onUpdateSearchTerm={onUpdateSearchTerm} />
        </div>
      </div>
      <div className="calendar__filters">
        <div className="calendar__filters-left">
          <Filters activeFilter={activeFilter} handleFilter={handleFilter} />
        </div>
        <div className="calendar__filters-right">
          <ProjectTypes
            activeTypes={activeTypes}
            setActiveTypes={setActiveTypes}
          />
        </div>
      </div>
    </div>
  );
};
