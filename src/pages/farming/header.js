import React from 'react';
import { HeaderCard } from "./header-carousel";


export const Header = () => {

    const onClickButton = (e) => {
        if (e.target.id == "active-button") {
            document.getElementById('active-button').style.border = "2px solid #2dff82";
            document.getElementById('ended-button').style.border = "none";
        }
        else{
            document.getElementById('active-button').style.border = "none";
            document.getElementById('ended-button').style.border = "2px solid #2dff82";
        }
    }   

    return (
        <>
            <div className="header-container">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="farming-container">
                        Farming
                    </p>
                    <div className="activity-buttons-container">
                        <button id="active-button" onClick={e => onClickButton(e)} className="activity-button">
                            <div className="activity-nutton-content">
                                Active ✅
                            </div>
                        </button>
                        <button id="ended-button" onClick={e => onClickButton(e)} className="activity-button">
                            <div className="activity-nutton-content">
                                Ended
                            </div>
                        </button>
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <HeaderCard />
                </div>
            </div>
        </ >
    )
};