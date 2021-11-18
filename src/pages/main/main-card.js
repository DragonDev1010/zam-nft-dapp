import React from 'react';
import {Link} from "react-router-dom";

export const MainCard = (props) => {
    return (
        <Link to={props.href} className={`${props.className} ${props.isSoon ? 'disabled' : ''}`}>
            <div className="main-card__title">
                {props.text}
            </div>
            {
                !props.isSoon || <span className="soon">Soon</span>
            }

            {
                !props.button || <button className="main-card__button">
                    {props.button}
                </button>
            }

        </Link>
    )
};
