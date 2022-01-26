import React from 'react';
import { Badge } from './badge';


export const Header = () => {
    return (
        <>
            <div className="zam-pad__header-container">
                <div className="zam-pad__badges-container">
                    <Badge background="linear-gradient(258.2deg, #924FFF 6.27%, #6F2BFF 88.95%)" content="Meta" />
                    <Badge background="linear-gradient(263.8deg, #F4A125 4.47%, #E27A00 80.38%)" content="GameFi" />
                    <Badge background="linear-gradient(254.62deg, #00C4EF 12.46%, #2596FF 77.13%)" content="DeFi" />
                    <Badge background="linear-gradient(263.45deg, #FF4B6B 11.06%, #CC205E 99.06%)" content="P2Earn" />
                    <Badge background="linear-gradient(252.42deg, #3CEB97 4.87%, #03B735 98.36%)" content="NFT" />
                </div>
                <br />
                <br />
                <p className="zam-pad__header-container__title">Welcome to the <span className="zam-pad__header-container__title__span">Future of Fundraising </span ></p>
                <p className="zam-pad__header-container__description">Fully decentralized fundraising! We launch IDO, IGO, INO on ZAMpad.</p>
                <p className="zam-pad__header-container__description">We also have an incubator to help you grow up.</p>
                <br />
                <br />
                <div className="zam-pad__header-container__metrics">
                    <div className="zam-pad__header-container__metrics__span">
                        <div>
                            97
                        </div>
                        <div style={{ "color": "#FFFFFF" }} className="zam-pad__header-container__metrics__description">
                            Funded Projects
                        </div>
                    </div>
                    <div className="zam-pad__header-container__metrics__item">
                        <div>
                            53 775
                        </div>
                        <div className="zam-pad__header-container__metrics__description">
                            Unique Partisipants
                        </div>
                    </div>
                    <div className="zam-pad__header-container__metrics__item">
                        <div>
                            $57 233 900
                        </div>
                        <div className="zam-pad__header-container__metrics__description">
                            Raised Capital
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
