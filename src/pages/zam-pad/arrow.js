import React from 'react';


export const Arrow = (props) => {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <img src="images/zam-pad/arrow-up.svg" />
                </div>
                <div style={{ marginLeft: "2%" }}>
                    {props.value}
                </div>
            </div>
        </>
    )
};