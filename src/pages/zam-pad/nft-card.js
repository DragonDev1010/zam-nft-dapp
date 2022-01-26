import React from 'react';
import { Badge } from './badge';


export const Nft = (props) => {

    return (
        <>
            <div className="nft">
                <div className="icons">
                    <div className="icons__people">
                        <img className="icons__people__img" src={props.icon} />
                    </div>
                    <div className="icons__lvl">
                        <img src={props.lvl} />
                    </div>
                </div>

                <div className="nft__belt" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="nft__belt__name">
                        <div>{props.belt} Belt</div> <div style={{ background: props.circleColor }} className="nft__belt__name__circle"></div>
                    </div>
                    <div>
                        <div className="nft__badge">
                            {props.badgeContent}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="nft__title-left">
                        <div>
                            Staking:
                        </div>
                        <div>
                            Pool size:
                        </div>
                    </div>
                    <div className="nft__title-right">
                        <div>
                            {props.zamCount}k ZAM
                        </div>
                        <div>
                            {props.percent}%
                        </div>
                    </div>
                </div>
                <div className="nft__table">
                    <div style={{ marginTop: "3%" }} className="nft__table__column">
                        <div>
                            <br />
                            <br />
                        </div>
                        <div className="nft__table__first-column">
                            Alloc. type:
                        </div>
                        <div style={{ marginTop: "30%" }} className="nft__table__first-column">
                            Alloc. size:
                        </div>
                        <div className="nft__table__first-column__seed-pools">
                            <div>💎 Private &</div>
                            <div>Seed Pools:</div>
                        </div>
                    </div>
                    <div className="nft__table__column">
                        <div style={{ color: "#2dfe81" }} className="nft__table__row">
                            <div>Without</div>
                            <div>NFT</div>
                        </div>
                        <div className="nft__table__row">
                            Guaranteed
                            <br />
                            <br />

                        </div>
                        <div className="nft__table__row">
                            Up to ${props.withoutNftUp}
                            <br />

                        </div>
                        <div className="nft__table__row">
                            <br />
                            {props.seedPools}
                        </div>
                    </div>
                    <div className="nft__table__column__last-column">
                        <div style={{ color: "#2dfe81" }} className="nft__table__row">
                            <div>With</div>
                            <div>NFT</div>
                        </div>
                        <div className="nft__table__last-cloumn">
                            <div>Guaranteed</div>
                            <div>x2</div>
                        </div>
                        <div className="nft__table__last-cloumn">
                            Up to ${props.withNftUp}
                        </div>
                        <div className="nft__table__last-cloumn">
                            <div>Private,</div>
                            <div>Seed Pools</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};