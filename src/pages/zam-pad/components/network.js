import React from 'react';


export const Network = ({value, icon}) => {

    const textModifier = (value === "BSC") 
                            ? "table__network-text_orange" 
                            : (value === "MATIC") ? "table__network-text_violet" 
                            : ""

    return (
        <>
            <div className='table__network'>
                <div className='table__network-img-wrapper'>
                    <img className='table__network-img' src={icon} />
                </div>
                <div className={`table__network-text ${textModifier}`}>
                    {value}
                </div>
            </div>
        </>
    )
};