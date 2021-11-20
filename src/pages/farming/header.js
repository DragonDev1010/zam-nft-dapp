import React from 'react';
import { HeaderCard } from "./header-carousel";
import {NETWORK_BSC, NETWORK_ETH, NETWORKS} from "@src/constants";


export const Header = () => {

    return (
        <>
            <div className="header-container">
                <div className="header-container__item">
                    <p className="farming-container">
                        Farming
                    </p>
                    {/*<div style={{ marginTop: "2em" }} className="button-outlines">*/}
                    {/*    <button className="button-outline">*/}
                    {/*        Active ✅*/}
                    {/*    </button>*/}
                    {/*    <button className="button-outline">*/}
                    {/*        Ended*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
                <div className="header-container__item">
                    <HeaderCard />
                </div>
            </div>
        </>
    )
};
