import React from 'react';


export const ChangeCourse = (props) => {

    let color = props.value.startsWith("+") ? "#2DFF82" : "#FF6868";

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", color: color }}>
                {props.value}
            </div>
        </>
    )
};