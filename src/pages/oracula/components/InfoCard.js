import React from "react";

export const InfoCard = ({ info }) => {
    if (!info?.length) return <></>

    return (
        <div className="profile-card">
            <div className="profile-card__info">
                {info.map((item, index) => {
                    if (!item.value) return

                    if (Array.isArray(item.value)) {
                        return (
                            <div key={Math.random(index)}>
                                <div className="profile-card__info-item">
                                    <div className="profile-card__info-key">{item.key}</div>
                                </div>
                                <table className="profile-card__info-table">
                                    <thead>
                                        <tr className="profile-card__info-key">
                                            <td>№</td>
                                            <td>Name</td>
                                            <td>ZAM for staking</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.value.map((val, i) => (
                                            <tr className="profile-card__info-value profile-card__info-value_text-left">
                                                <td className="profile-card__block" key={3*i + 0}>{val.number}</td>
                                                <td className="profile-card__block" key={3*i + 1}>{val.beltName}</td>
                                                <td className="profile-card__block" key={3*i + 2}>{val.zamToStake}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }

                    return (
                        <div key={Math.random(index)} className="profile-card__info-item">
                            <div className="profile-card__info-key">{item.key}:</div>
                            <p className="profile-card__info-value">{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}