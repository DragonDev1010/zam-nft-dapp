import React from 'react';


export const ParticipateCard = (props) => {

    return (
        <>
            <div className="participate-card">
                <div style={{ height: "42%" }}>
                    <img src={props.image} />
                </div>
                <div className="participate-card__content-title">
                    <span className="participate-card__content-title__span">{props.number}</span> {props.title}
                </div>
                <br />
                <br />
                <div className="participate-card__content">
                    {props.content}
                </div>
                <div>
                    <button className="participate-card__button">{props.button}</button>
                </div>
            </div>
        </>
    )
};