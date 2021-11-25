import React, {useState, useContext} from 'react';
import {InputRangeComponent} from "@src/components/input-range";
import {numberFormat, toFixed} from "../../utils";
import {RateContext} from "../../context";
import {StakingContext} from "@src/context/staking-context";


export const StakingCalculator = () => {
    const [dragValue, setDragValue] = useState(17);
    const {apy} = useContext(StakingContext);
    const {rate} = useContext(RateContext);

    let stakeAmount = parseInt(Math.pow(10, dragValue / 16.66));
    if (stakeAmount > 1000000) {
        stakeAmount = 1000000;
    }


    const stakeRewardYear = stakeAmount * (1 + apy / 100) - stakeAmount;
    const stakeRewardMonth = stakeRewardYear / 12;
    const stakeRewardDay = stakeRewardYear / 365;

    return (
        <>
            <div className="staking-calculator-header">
                <div>
                    Staking Calculator
                </div>
            </div>
            <div className="range-title">
                <div>
                    <div className="range-title-header">
                        Your $ZAM Stake
                    </div>
                    <div className="range-title-body">
                        {numberFormat(stakeAmount)}
                    </div>
                </div>
                <div>
                    <div className="range-title-header">
                        Yearly Return
                    </div>
                    <div style={{color: "#2DFF82"}} className="range-title-body">
                        +{apy}%
                    </div>
                </div>
            </div>

            <div className="staking-calculator__bar">
                <InputRangeComponent setDragValue={setDragValue} startValue={dragValue} maxValue={100}/>
            </div>
            <div className="stakinkg-calculator-footer">
                <div className="calculator-footer-column">
                    <div className="period-container">
                        Daily
                    </div>
                    <div className="period-zam">
                        {numberFormat(toFixed(stakeRewardDay, 100))} ZAM
                    </div>
                    <div className="period-zam-cost">
                        ${numberFormat(toFixed(rate * stakeRewardDay, 100))}
                    </div>
                </div>
                <div className="calculator-footer-column">
                    <div className="period-container">
                        Monthly
                    </div>
                    <div className="period-zam">
                        {numberFormat(toFixed(stakeRewardMonth, 100))} ZAM
                    </div>
                    <div className="period-zam-cost">
                        ${numberFormat(toFixed(rate * stakeRewardMonth, 100))}
                    </div>
                </div>
                <div className="calculator-footer-column">
                    <div className="period-container">
                        Yearly
                    </div>
                    <div className="period-zam">
                        {numberFormat(toFixed(stakeRewardYear, 100))} ZAM
                    </div>
                    <div className="period-zam-cost">
                        ${numberFormat(toFixed(rate * stakeRewardYear, 100))}
                    </div>
                </div>
            </div>
        </>
    )
};
