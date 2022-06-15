import React, {useContext} from 'react';
import {StakingContext} from "@src/context/staking-context";


export const SmallBlock = () => {
    const {apy} = useContext(StakingContext);

    return (
        <>
            <div  className="small-block-container">
                <div className="small-block-header">
                    Current APY
                </div>
                <div className="small-block-body">
                    {apy}%
                </div>
            </div>
        </ >
    )
};
