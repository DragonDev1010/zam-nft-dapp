import React from 'react';


export const Network = (props) => {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", color: props.color }}>
                <div>
                    <img src={props.icon} />
                </div>
                <div style={{ marginLeft: "4%" }}>
                    {props.value}
                </div>
            </div>
        </>
    )
};