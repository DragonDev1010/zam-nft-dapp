import React, { useState } from "react";

import { PROJECTS_INFO } from "./info";

import { Header } from "./components/header";
import { Tables } from "./components/tables";

export const CalendarBody = () => {
  const [activeFilter, setActiveFilter] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTypes, setActiveTypes] = useState({
    All: true,
    IDO: false,
    INO: false,
    IGO: false,
    ICO: false,
    IEO: false,
    IFO: false,
  });

  const handleFilter = (title) => {
    setActiveFilter(title);
  };

  const onUpdateSearchTerm = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const searchProjects = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.title.toLowerCase().indexOf(term) > -1;
    });
  };

  const foundProjects = searchProjects([...PROJECTS_INFO], searchTerm);

  const selectedTypes = [];

  for (let key in activeTypes) {
    if (activeTypes[key] === true) {
      selectedTypes.push(key);
    }
  }

  const typesFilter = (items, types) => {
    if (types.All) {
      return items;
    }
    if (!types.All && !types.IDO && !types.INO && !types.IGO && !types.ICO && !types.IEO && !types.IFO) {
      setActiveTypes(prevState => ({
        ...prevState,
        All: true,
      }));

      return items;
    }

    return items.filter((item) => {
      if (selectedTypes.includes(item.type)) {
        return item;
      }
    });
  };

  const visibleProjects = typesFilter(foundProjects, activeTypes);

  return (
    <div className="calendar">
      <Header
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        onUpdateSearchTerm={onUpdateSearchTerm}
        activeTypes={activeTypes}
        setActiveTypes={setActiveTypes}
      />
      <Tables
        activeFilter={activeFilter}
        visibleProjects={visibleProjects}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};
