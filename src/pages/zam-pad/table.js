import React from 'react';
import { Arrow } from './arrow';
import { ChangeCourse } from './change-course';
import { Network } from './network';


export const Table = (props) => {

    return (
        <>
            <div className="table-columns-names">
                <div className="table-columns-names__name">
                    CMC Rank
                </div>
                <div style={{ width: "20%" }}>
                    Name
                </div>
                <div className="table-columns-names__name">
                    Listing Price
                </div>
                <div className="table-columns-names__name">
                    Price
                </div>
                <div className="table-columns-names__name">
                    Change 24H
                </div>
                <div className="table-columns-names__name">
                    Change 7D
                </div>
                <div className="table-columns-names__name">
                    Market Cap
                </div>
                <div className="table-columns-names__name">
                    Vol (24H)
                </div>
                <div className="table-columns-names__name">
                    Network
                </div>
                <div className="table-columns-names__name">
                    Total Raise
                </div>
                <div className="table-columns-names__name">
                    All Time High
                </div>
            </div>
            <table className="table">
                <tr className="table__first-row">
                    <td style={{ width: "8%", borderTopLeftRadius: "20px" }} className="table__first-column">124</td>
                    <td style={{ width: "20%" }} className="table__first-column">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/zam-table.svg" />
                            <div className="table__name">
                                <div>
                                    Zamio
                                </div>
                                <div className="table__name-desc">
                                    $ZAM
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__first-column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__first-column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__first-column">
                        <ChangeCourse value="+2.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__first-column">
                        <ChangeCourse value="+7.23%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__first-column">$135M</td>
                    <td style={{ width: "8%" }} className="table__first-column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__first-column">
                        <Network color="#F0B90B" value="BSC" icon="images/zam-pad/bscc.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__first-column">$3.5m</td>
                    <td style={{ width: "8%", borderTopRightRadius: "20px", color: "#2dff82" }} className="table__first-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%" }} className="table__column">147</td>
                    <td style={{ width: "20%" }} className="table__column">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/highstreet-table.svg" />
                            <div className="table__name">
                                <div>
                                    Highstreet
                                </div>
                                <div className="table__name-desc">
                                    $REALM
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="+2.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-7.23%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="SOL" color="#FFFFFF" icon="images/zam-pad/sol.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%" }} className="table__column">195</td>
                    <td style={{ width: "20%" }} className="table__first">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/realm-table.svg" />
                            <div className="table__name">
                                <div>
                                    Realm
                                </div>
                                <div className="table__name-desc">
                                    $REALM
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-2.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="+7.23%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="BSC" color="#F0B90B" icon="images/zam-pad/bscc.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%" }} className="table__column">242</td>
                    <td style={{ width: "20%" }} className="table__column">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/gunstar-table.svg" />
                            <div className="table__name">
                                <div>
                                    Gunstar Metaverse Highstreet Power Token NFT GameFi La...
                                </div>
                                <div className="table__name-desc">
                                    $GST
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-2.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-6.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="ETH" color="#FFFFFF" icon="images/zam-pad/eth.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%" }} className="table__column">2691</td>
                    <td style={{ width: "20%" }} className="table__column">
                        <div style={{ display: "flex", }}>
                            <img src="images/zam-pad/sidus-table.svg" />
                            <div className="table__name">
                                <div>
                                    Sidus Heroes Sidus Token
                                </div>
                                <div className="table__name-desc">
                                    $MGOD
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-5.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-8.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="MATIC" color="#8247E5" icon="images/zam-pad/matic.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%" }} className="table__column">295</td>
                    <td style={{ width: "20%" }} className="table__column">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/deathroad-table.svg" />
                            <div className="table__name">
                                <div>
                                    Deathroad
                                </div>
                                <div className="table__name-desc">
                                    $DRACE
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8" }} className="table__column">
                        <ChangeCourse value="+8.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="+44.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="BSC" color="#F0B90B" icon="images/zam-pad/bscc.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
                <tr className="table__row">
                    <td style={{ width: "8%", borderBottomLeftRadius: "20px" }} className="table__column">327</td>
                    <td style={{ width: "20%" }} className="table__column">
                        <div style={{ display: "flex" }}>
                            <img src="images/zam-pad/zam-table.svg" />
                            <div className="table__name">
                                <div>
                                    The killbox
                                </div>
                                <div className="table__name-desc">
                                    $KBOX
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$0.03</td>
                    <td style={{ width: "8%" }} className="table__column">$1.91</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-8.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">
                        <ChangeCourse value="-18.83%" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$135M</td>
                    <td style={{ width: "8%" }} className="table__column">$5.4m</td>
                    <td style={{ width: "8%" }} className="table__column">
                        <Network value="BSC" color="#F0B90B" icon="images/zam-pad/bscc.svg" />
                    </td>
                    <td style={{ width: "8%" }} className="table__column">$3.5m</td>
                    <td style={{ width: "8%", borderBottomRightRadius: "20px" }} className="table__last-column">
                        <Arrow value="23x" />
                    </td>
                </tr>
            </table>
        </>
    )
};