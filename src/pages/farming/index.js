import React from 'react';
import { CardComponent } from './card';
import { Header } from "./header"
import { pairs } from './pairs';
import {MetaTagsComponent} from "@src/components/metatags";


export const FarmPage = () => {
    return (
        <article className="p-0">
            <MetaTagsComponent page="farming"/>

            <div className="general-container">
                <Header />
                <div className="cards farming-cards">
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
