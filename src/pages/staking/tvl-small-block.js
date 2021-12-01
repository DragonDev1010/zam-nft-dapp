import React, {useContext} from 'react';
import {numberFormat} from "@src/utils";
import {RateContext} from "@src/context";


export const TvlBlock = ({tvl}) => {
    const {rate} = useContext(RateContext);

    return (
        <>
            <div className="tvr-block">
                <div className="tvr-block-header">
                    TVL
                </div>
                <div className="tvr-block-body">
                    ${numberFormat(parseInt(tvl * rate))}
                    <div className="tvr-block-body-span">
                        {numberFormat(tvl)} ZAM
                    </div>
                </div>
            </div>
        </ >
    )
};
