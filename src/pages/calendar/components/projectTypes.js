import React from "react";

import { TYPES_INFO } from "../info";

import { ProjectType } from "./projectType";

export const ProjectTypes = ({ setActiveTypes, activeTypes }) => {
  return (
    <div className="project-types">
      <div className="project-types__title">Project Type:</div>
      <div className="project-types__filters">
        {TYPES_INFO.length &&
          TYPES_INFO.map((item) => (
            <ProjectType
              {...item}
              key={item.title}
              activeTypes={activeTypes}
              setActiveTypes={setActiveTypes}
            />
          ))}
      </div>
    </div>
  );
};
