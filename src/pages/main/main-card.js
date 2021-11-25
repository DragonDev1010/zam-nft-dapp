import React from 'react';
import {Link} from "react-router-dom";

export const MainCard = (props) => {
    if (props.isExt) {
        return (
            <a href={props.href} target="_blank" className={`${props.className} ${props.href === '#' ? 'disabled' : ''}`}>
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

            </a>
        )
    }
    return (
        <Link to={props.href} className={`${props.className} ${props.href === '#' ? 'disabled' : ''}`}>
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
