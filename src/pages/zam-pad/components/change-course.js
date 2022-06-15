import React from 'react';


export const ChangeCourse = ({value}) => {

    let greenModifier = value.startsWith("+") ? "table__rise_green" : "";

    return (
        <>
            <div className={`table__rise ${greenModifier}`}>
                {value}
            </div>
        </>
    )
};