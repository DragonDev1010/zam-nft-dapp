import React, { useEffect } from "react";
import cn from "classnames";

export const ProjectType = ({
  title,
  modifier,
  activeTypes,
  setActiveTypes,
}) => {
  const active = activeTypes[title];

  const disabledButtons = Object.values(activeTypes).includes(true);

  const handleSwitch = (e) => {
    if (e.target.textContent === "All" || !disabledButtons) {
      setActiveTypes(() => ({
        All: true,
        IDO: false,
        INO: false,
        IGO: false,
        ICO: false,
        IEO: false,
        IFO: false,
      }));
    } else {
      setActiveTypes((prevState) => ({
        ...prevState,
        [title]: !active,
        All: false,
      }));
    }
  };

  return (
    <button
      className={cn(`project-types__button project-types__button_${modifier}`, {
        active,
      })}
      onClick={handleSwitch}
    >
      {title}
    </button>
  );
};
