import React from 'react';
import { HeaderCard } from "./header-carousel";


export const Header = () => {

    return (
        <>
            <div className="header-container">
                <div style={{ marginTop: "2em", marginLeft: "2em" }}>
                    <p className="farming-container">
                        Farming
                    </p>
                    <div className="activity-buttons-container">
                        <button id="active-button" className="activity-button">
                            <div className="activity-nutton-content">
                                Active ✅
                            </div>
                        </button>
                        <button id="ended-button" className="activity-button">
                            <div className="activity-nutton-content">
                                Ended
                            </div>
                        </button>
                    </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                    {/*<HeaderCard />*/}
                </div>
            </div>
        </>
    )
};
