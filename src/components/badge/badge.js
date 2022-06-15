import React from 'react';

export const Badge = (props) => {
    const modifier = props.modifier

    return (
        <>
            <div className={`badge ${modifier}`}>
                <p>{props.content}</p>
            </div>
        </>
    )
};