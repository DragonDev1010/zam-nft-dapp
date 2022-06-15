import React from 'react';
import cn from "classnames";

export const Button = ({name, content, icon, modifier, activeFilter, handleFilter}) => {

    const active = activeFilter === name;

    return (
        <>
            <button
                className={cn("network-button", { active })}
                onClick={() => handleFilter(name)}>
                {icon ? <img className="network-button__img" src={icon} /> : ''}
                <div className={`network-button__text ${modifier}`}>{content}</div>
            </button>
        </>
    )
};