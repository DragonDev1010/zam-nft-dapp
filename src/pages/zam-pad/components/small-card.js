import React from 'react';


export const SmallCard = ({children, modifier}) => {

    return (
      <>
        <div className={"small-card" + ' ' + modifier}>
            {children}
        </div>
      </>
    )
};