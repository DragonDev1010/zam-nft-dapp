import React from 'react';


export const Button = (props) => {

    return (
        <>
            <button className="network-button">
                <img src={props.icon} />
                <div>{props.content}</div>
            </button>
        </>
    )
};