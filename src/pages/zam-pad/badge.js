import React from 'react';


export const Badge = (props) => {

    return (
        <>
            <div style={{ "background": props.background }} className="zam-pad__header-container__badge">
                <p>{props.content}</p>
            </div>
        </>
    )
};