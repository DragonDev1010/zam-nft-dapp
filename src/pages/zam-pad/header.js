import React from 'react';
import { Badge } from '../../components/badge/badge';
import { Metric } from './components/metric';

export const Header = () => {
    return (
        <>
            <div className="zam-pad__header-container">
                <div className="zam-pad__header-wrapper">
                    <div className="zam-pad__header-left">
                        <div className="zam-pad__badges-container">
                            <Badge modifier="badge_violet" content="Meta" />
                            <Badge modifier="badge_orange" content="GameFi" />
                            <Badge modifier="badge_blue" content="DeFi" />
                            <Badge modifier="badge_red" content="P2Earn" />
                            <Badge modifier="badge_green" content="NFT" />
                        </div>
                        <div className="zam-pad__header-text">
                            <p className="zam-pad__header-title">Welcome to the Future of Fundraising </p>
                            <p className="zam-pad__header-description">Fully decentralized fundraising! We launch IDO, IGO, INO on ZAMpad.</p>
                            <p className="zam-pad__header-description">We also have an incubator to help you grow up.</p>
                        </div>
                    </div>
                    <div className="zam-pad__header-right">
                        <div className="zam-pad__header-metrics">
                            <Metric modifier="zam-pad__header-metrics-count_green" count="97" text="Funded Projects"/>
                            <Metric modifier="" count="$57 233 900" text="Raised Capital"/>
                            <Metric modifier="" count="53 775" text="Unique Partisipants"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
