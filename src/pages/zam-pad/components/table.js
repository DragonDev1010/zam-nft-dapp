import React from 'react';
import { Arrow } from './arrow';
import { ChangeCourse } from './change-course';
import { Network } from './network';


export const Table = () => {

    return (
        <>
            <table className="table">
                <thead className="table__head">
                    <tr className="table__row">
                        <th className="table__cell">CMC Rank</th>
                        <th className="table__cell table__cell_name">Name</th>
                        <th className="table__cell">Listing Price</th>
                        <th className="table__cell">Price</th>
                        <th className="table__cell">Change 24H</th>
                        <th className="table__cell">Change 7D</th>
                        <th className="table__cell">Market Cap</th>
                        <th className="table__cell">Vol (24H)</th>
                        <th className="table__cell">Network</th>
                        <th className="table__cell">Total Raise</th>
                        <th className="table__cell">All Time High</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr className="table__row table__row_first">
                        <td className="table__cell">124</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/zam-table.svg" alt="Zamio" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Zamio</div>
                                    <div className="table__token-description">$ZAM</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.03</td>
                        <td className="table__cell">$1.91</td>
                        <td className="table__cell">
                            <ChangeCourse value="+2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="+7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="BSC" icon="images/zam-pad/bscc.svg" />
                        </td>
                        <td className="table__cell">$3.5m</td>
                        <td className="table__cell">
                            <Arrow value="23x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">147</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/highstreet-table.svg" alt="Highstreet" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Highstreet</div>
                                    <div className="table__token-description">$REALM</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.12</td>
                        <td className="table__cell">$32.12</td>
                        <td className="table__cell">
                            <ChangeCourse value="+2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="-7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="SOL" icon="images/zam-pad/sol.svg" />
                        </td>
                        <td className="table__cell">$300k</td>
                        <td className="table__cell">
                            <Arrow value="15x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">242</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/realm-table.svg" alt="Realm" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Realm</div>
                                    <div className="table__token-description">$GST</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.12</td>
                        <td className="table__cell">$32.12</td>
                        <td className="table__cell">
                            <ChangeCourse value="-2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="+7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="BSC" icon="images/zam-pad/bscc.svg" />
                        </td>
                        <td className="table__cell">$500k</td>
                        <td className="table__cell">
                            <Arrow value="9x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">242</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/gunstar-table.svg" alt="Realm" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Gunstar Metaverse Highstreet Power Token NFT GameFi La...</div>
                                    <div className="table__token-description">$REALM</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.87</td>
                        <td className="table__cell">$6.87</td>
                        <td className="table__cell">
                            <ChangeCourse value="+2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="-7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="ETH" icon="images/zam-pad/eth.svg" />
                        </td>
                        <td className="table__cell">$200k</td>
                        <td className="table__cell">
                            <Arrow value="5x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">2691</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/sidus-table.svg" alt="Sidus Heroes Sidus Token" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Sidus Heroes Sidus Token</div>
                                    <div className="table__token-description">$MGOD</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.99</td>
                        <td className="table__cell">$1.99</td>
                        <td className="table__cell">
                            <ChangeCourse value="+2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="-7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="MATIC" icon="images/zam-pad/matic.svg" />
                        </td>
                        <td className="table__cell">$1m</td>
                        <td className="table__cell">
                            <Arrow value="45x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">295</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/deathroad-table.svg" alt="Deathroad" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">Deathroad</div>
                                    <div className="table__token-description">$DRACE</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.36</td>
                        <td className="table__cell">$0.36</td>
                        <td className="table__cell">
                            <ChangeCourse value="+2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="+7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="BSC" icon="images/zam-pad/bscc.svg" />
                        </td>
                        <td className="table__cell">$2m</td>
                        <td className="table__cell">
                            <Arrow value="4x" />
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__cell">327</td>
                        <td className="table__cell table__cell_name">
                            <div className="table__token">
                                <div className="table__token-img-wrapper">
                                    <img src="images/zam-pad/zam-table.svg" alt="The killbox" className="table__token-img" />
                                </div>
                                <div className="table__token-text">
                                    <div className="table__token-name">The killbox</div>
                                    <div className="table__token-description">$KBOX</div>
                                </div>
                            </div>
                        </td>
                        <td className="table__cell">$0.21</td>
                        <td className="table__cell">$0.21</td>
                        <td className="table__cell">
                            <ChangeCourse value="-2.83%" />
                        </td>
                        <td className="table__cell">
                            <ChangeCourse value="+7.23%" />
                        </td>
                        <td className="table__cell">$135M</td>
                        <td className="table__cell">$5.4M</td>
                        <td className="table__cell">
                            <Network value="BSC" icon="images/zam-pad/bscc.svg" />
                        </td>
                        <td className="table__cell">$1,5m</td>
                        <td className="table__cell">
                            <Arrow value="16x" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};