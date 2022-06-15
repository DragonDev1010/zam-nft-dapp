import React from 'react';


export const Arrow = ({value}) => {

    return (
        <>
            <div className='table__high'>
                <div className='table__high-img-wrapper'>
                    <img className='table__high-img' src="images/zam-pad/arrow-up.svg" />
                </div>
                <div className='table__high-text'>
                    {value}
                </div>
            </div>
        </>
    )
};