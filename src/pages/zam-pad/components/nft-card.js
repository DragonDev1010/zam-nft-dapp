import React from 'react';

export const Nft = ({ icon, lvlNumber, belt, circleColor, badgeContent, zamCount, percent, withoutNftUp, seedPools, multiplier, withNftUp, privatePool, seedPool }) => (
    <div className="nft">
        <div className="nft__head">
            <div className="nft__img-wrapper">
                <img className="nft__img" src={icon} />
            </div>
            <div className="nft__lvl">
                <div className="nft__lvl-number">{lvlNumber}</div>
                <div className="nft__lvl-text">lvl</div>
            </div>
        </div>
        <div className="nft__content">
            <div className="nft__belt">
                <div className="nft__belt-block">
                    <div className="nft__belt-name">{belt} Belt</div> 
                    <div style={{ background: circleColor }} className="nft__belt-circle"></div>
                </div>
                <div className="nft__belt-block">
                    <div className="nft__badge">
                        {`${badgeContent} NFT`}
                    </div>
                </div>
            </div>
            <div className="nft__info">
                <div className="nft__info-block">
                    <div className="nft__info-title">
                        Staking:
                    </div>
                    <div className="nft__info-title">
                        Pool size:
                    </div>
                </div>
                <div className="nft__info-block">
                    <div className="nft__info-count">
                        {zamCount}k ZAM
                    </div>
                    <div className="nft__info-count">
                        {percent}%
                    </div>
                </div>
            </div>

            <div className="nft__table">
                <div className="nft__table-column nft__table-column_first">
                    <div className="nft__table-title"></div>
                    <div className="nft__table-cell">Alloc. Type:</div>
                    <div className="nft__table-cell">Alloc. Size:</div>
                    <div className="nft__table-cell nft__table-cell_last">
                        💎 Private & 
                        <br />
                        Seed Pools:
                    </div>
                </div>
                <div className="nft__table-column">
                    <div className="nft__table-title">
                        Without
                        <br />
                        NFT
                    </div>
                    <div className="nft__table-cell">Guaranteed</div>
                    <div className="nft__table-cell">Up to ${withoutNftUp}</div>
                    <div className="nft__table-cell">{seedPools}</div>
                </div>
                <div className="nft__table-column nft__table-column_green">
                    <div className="nft__table-title">
                        With
                        <br />
                        NFT
                    </div>
                    <div className="nft__table-cell">
                        <div>Guaranteed</div>
                        <div>{multiplier}</div>
                    </div>
                    <div className="nft__table-cell">Up to ${withNftUp}</div>
                    <div className="nft__table-cell">
                        <div>{privatePool}</div>
                        <div>{seedPool} Pools</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
