import React from 'react';
import { useState } from 'react';


export const StakingZam = () => {
    const [valueFrom, setValueFrom] = useState(0);
    const inputRefFrom = React.createRef();

    const setMaxZam = () => {
        setValueFrom(5000);
    }

    return (
        <>
            <div className="stake-zam-container">
                <div className="stake-zam-container-header">
                    <div style={{marginLeft:"2em"}}> 
                        Stake ZAM
                    </div>
                    <div>
                        <img src="../../../images/stake-icon.png" />
                    </div>
                </div>
                <div className="field-container">
                    <div className="filed-container-title">
                        Stake ZAM <span className="field-container-title-span">BEP20</span>
                    </div>
                    <div className="input-field mt-10">
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
                    <button className="connect-wallet-button">Connect Wallet</button>
                </div>
            </div>
        </>
    )
};
