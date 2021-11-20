import React from 'react';

export const BodyCard = (props) => {
    return (
        <>
            <div style={{height: props.height}} className="card card-filled audits-body-card">
                <div className="audits-body-card__left">
                    <div className="audits-card-header-title">
                        <div>
                            <img src={props.titleIcon}/>
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
                                <img src="images/github.svg"/>
                            </div>
                            <div className="audits-github-link-container">
                                On Github <a href={props.githubLinkHref}
                                             target="_blank"
                                             className="audits-github-link">{props.githubLink}</a>
                            </div>
                        </div>
                        {props.bscscan && <div className="audits-bscscan">
                            <div>
                                <img src="images/bsc-scan.svg"/>
                            </div>
                            <div className="audits-github-link-container">
                                On BscScan <a href={props.githubLink} className="audits-github-link">{props.bscscan}</a>
                            </div>
                        </div>}
                        <div className="audits-card-buttons">
                            <a href="https://www.certik.org/projects/zam-io" target="_blank" className="button-outline">
                                <img src="images/audits.svg" className="button-outline__icon"/>
                                {props.firstButtonContent}
                            </a>
                            {props.secondButtonContent &&
                            <button style={{marginLeft: "1em"}} className="audits-button audits-button-2">
                                <div className="audits-button-icon">
                                    <div>
                                        <img src="images/audits.svg"/>
                                    </div>
                                    <div style={{marginLeft: "0.3em"}}>
                                        {props.secondButtonContent}
                                    </div>
                                </div>
                            </button>}
                        </div>
                    </div>
                </div>
                <div className="audits-body-card__right hidden-sm">
                    <img src={props.largeIcon}/>
                </div>
            </div>
        </ >
    )
};
