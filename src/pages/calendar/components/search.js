import React, { useState } from "react";

import { IconSearch } from "@src/icons/icons.js";

export const Search = ({ onUpdateSearchTerm }) => {
  const [serchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onUpdateSearchTerm(e.target.value);
  };

  return (
    <div className="search">
      <label className="search__label">
        <input
          type="text"
          name="projects"
          className="search__input"
          placeholder="Search Project"
          value={serchValue}
          onChange={handleChange}
        />
        <div className="search__icon">
          <IconSearch />
        </div>
      </label>
    </div>
  );
};
