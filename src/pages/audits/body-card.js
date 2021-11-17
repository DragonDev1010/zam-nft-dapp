import React from 'react';

export const BodyCard = (props) => {
    return (
        <>
            <div style={{ height: props.height }} className="audits-body-card">
                <div style={{ width: "38em" }}>
                    <div className="audits-card-header-title">
                        <div>
                            <img src={props.titleIcon} />
                        </div>
                        <div className="audits-card-title-text">
                            {props.title}
                        </div>
                    </div>
                    <div className="audit-card-content">
                        <div className="audits-card-subject">
                            {props.subject}
                        </div>
                        <div className="audits-card-date">
                            {props.date}
                        </div>
                        <div className="audits-github">
                            <div>
                                <img src="../../../images/github.svg" />
                            </div>
                            <div className="audits-github-link-container">
                                On Github <a href={props.githubLink} className="audits-github-link">{props.githubLink}</a>
                            </div>
                        </div>
                        {props.bscscan && <div className="audits-bscscan">
                            <div>
                                <img src="../../../images/bsc-scan.svg" />
                            </div>
                            <div className="audits-github-link-container">
                                On BscScan <a href={props.githubLink} className="audits-github-link">{props.bscscan}</a>
                            </div>
                        </div>}
                        <div className="audits-card-buttons">
                            <button className="audits-button">
                                <div className="audits-button-icon">
                                    <div>
                                        <img src="../../../images/audits.svg" />
                                    </div>
                                    <div style={{ marginLeft: "0.3em" }}>
                                        {props.firstButtonContent}
                                    </div>
                                </div>
                            </button>
                            {props.secondButtonContent && <button style={{ marginLeft: "1em" }} className="audits-button audits-button-2">
                                <div className="audits-button-icon">
                                    <div>
                                        <img src="../../../images/audits.svg" />
                                    </div>
                                    <div style={{ marginLeft: "0.3em" }}>
                                        {props.secondButtonContent}
                                    </div>
                                </div>
                            </button>}
                        </div>
                    </div>
                </div>
                <div className="audits-large-image-container">
                    <img src={props.largeIcon} />
                </div>
            </div>
        </ >
    )
};