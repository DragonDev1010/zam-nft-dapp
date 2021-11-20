import React from "react";
import {IconQuestion} from "@src/icons/icons";

export const Tooltip = ({text}) => {
    return (
        <span className="tooltip" onClick={() => setActive(!active)}>
            <IconQuestion/>
            <div className={`tooltip__content`}>{text}</div>
        </span>
    )
}
