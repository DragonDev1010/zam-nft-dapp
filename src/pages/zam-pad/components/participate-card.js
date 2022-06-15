import React from 'react';
import { Link } from 'react-router-dom';

export const ParticipateCard = ({image, button, title, number, content, localUrl}) => {

    return (
        <div className="participate-card">
            <div className="participate-card__top-container">
                <div className="participate-card__img-wrapper">
                    <img className="participate-card__img" src={image} />
                </div>
                <div className="participate-card__top-buttons">
                    {localUrl 
                    ? <Link to={localUrl} className="small-btn">{button}</Link>
                    : <button className="small-btn">{button}</button>  }
                </div>
            </div>

            <div className="participate-card__content-title">
                <span className="green-span">{number}</span> {title}
            </div>
            
            <div className="participate-card__content">
                {content}
            </div>
        </div>
    )
};