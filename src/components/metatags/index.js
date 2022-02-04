import React from "react";
import MetaTags from "react-meta-tags";

export const MetaTagsComponent = ({page}) => {
    let title = '';
    let description = '';

    switch (page) {
        case 'main':
            title = 'Web dApps — Universal Platform for DEconomy';
            description = 'Web dApps by Zamio solve the problem of complexity by creating a user-friendly ' +
                'application for managing crypto wallets, swapping assets, investing, and monitoring information.';
            break;
        case 'z-meta-board':
            title = 'zMetaBoard Analytical Dashboard';
            description = 'zMetaBoard can be accessed by anyone registered in the http://Zam.io ecosystem. ' +
                'External projects can connect with zMetaBoard via a publicly available API.';
            break;
        case 'swap':
            title = 'Swap ZAM Token via DEX';
            description = 'The swap unit provides the functionality to convert assets from one cryptocurrency to ' +
                'another. Users will have all the required data to process the swap operation.';
            break;
        case 'staking':
            title = 'Staking ZAM Token';
            description = 'Zamio encourages long-term holders to stake their tokens to collect staking rewards, ' +
                'reaching up to 89% APY for early stakers.';
            break;
        case 'bridge':
            title = 'Bridge ETH-BSC';
            description = 'ZAM Token has cross-chain support on two of the world’s most popular blockchains: ' +
                'Ethereum (ETH) and Binance Smart Chain (BSC).';
            break;
        case 'farming':
            title = 'Farming: Provide Liquidity, Earn ZAM';
            description = 'The farming unit provides the functionality for yield farming. This process involves ' +
                'lending cryptocurrency. Pools will display all the invested assets, data, and analytics';
            break;
        case 'audits':
            title = 'ZAM Token Audit';
            description = 'The audits page represents all the audits that ZAM token has. This page displays all the ' +
                'information about smart contract audits and much more.';
            break;
    }

    return (
        <MetaTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
        </MetaTags>
    );
}
