import React from 'react';
import { CardComponent } from './card';
import { Header } from "./header"
import { cardSettings } from './card-settings';


export const FarmPage = () => {
    return (
        <article>
            <div className="general-container">
                <Header />
                <div className="farming-cards">
                    {
                        cardSettings.map(_ =>
                            <CardComponent background={_.background} leftCoin={_.leftCoin} rightCoin={_.rightCoin} key={_.number} />
                        )
                    }
                </div>
            </div>
        </article >
    )
};
