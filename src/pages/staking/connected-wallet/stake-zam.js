import React from 'react';
import { useState } from 'react';


export const StakeZam = () => {
    const [valueFrom, setValueFrom] = useState(0);
    const inputRefFrom = React.createRef();

    const setMaxZam = () => {
        setValueFrom(2435.65);
    }

    return (
        <>
            <div className="stake-zam-container">
                <div className="stake-zam-container-header">
                    <div style={{ marginLeft: "2em" }}>
                        Stake/UnStake
                    </div>
                    <div>
                        <img src="../../../../images/stake-icon.png" />
                    </div>
                </div>
                <div className="field-container">
                    <div style={{display:'flex',justifyContent:"space-between"}} className="filed-container-title">
                        <div>Stake ZAM <span className="field-container-title-span">BEP20</span></div>
                        <div>Balance: 2 435.65</div>
                    </div>
                    <div style={{marginTop:"2em"}} className="input-field mt-10">
                        <div className="input-field__column">
                            <input className="input-field__input text-left"
                                onChange={(event) => setValueFrom(parseInt(event.target.value))}
                                value={valueFrom || ''} placeholder="0" />
                        </div>
                        <div className="input-field__column input-field__column--token-name">
                            <div style={{ justifyContent: "flex-end" }} className="input-field__input flex-end">
                                <div className="zam-token-name">
                                    ZAM
                                </div>
                                <button onClick={e => setMaxZam()} className="max-button">Max</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="connect-wallet-button-container">
                    <button className="connect-wallet-button">Stake</button>
                </div>
            </div>
        </>
    )
};
