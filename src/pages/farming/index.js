import React from 'react';
import { CardComponent } from './card';
import { Header } from "./header"
import { pairs } from './pairs';


export const FarmPage = () => {
    return (
        <article className="farming">
            <div className="general-container">
                <Header />
                <div className="farming-cards">
                    {
                        pairs.map((item, index) =>
                            <CardComponent {...item} key={`card-${index}`}/>
                        )
                    }
                </div>
            </div>
        </article >
    )
};
