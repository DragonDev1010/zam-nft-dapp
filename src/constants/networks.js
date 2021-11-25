import Web3 from "web3";

export const NETWORK_ETH = 'eth';
export const NETWORK_BSC = 'bsc';
export const NETWORK_PLG = 'plg';
export const NETWORK_SLN = 'sln';
export const NETWORK_HCC = 'hcc';

export const NETWORKS = {
    [NETWORK_ETH]: {
        icon: '/images/tokens/icon_token_eth.svg',
        name: 'ETH Network',
        color: '#4A9DFB',
        chainId: ['0x1'],
        rpcUrl: Web3.givenProvider,
    },
    [NETWORK_BSC]: {
        icon: '/images/tokens/icon_token_bsc.svg',
        name: 'BSC Network',
        color: '#82ca9d',
        chainId: ['0x38'],
        rpcUrl: process.env.RPC_URL_BSC
    },
    [NETWORK_PLG]: {
        icon: '/images/tokens/icon_token_polygon.svg',
        name: 'Polygon',
        color: '#4A9DFB',
        chainId: [],
        rpcUrl: '',
        isSoon: true
    },
    [NETWORK_SLN]: {
        icon: '/images/tokens/icon_token_solana.svg',
        name: 'Solana',
        color: '#4A9DFB',
        chainId: [],
        rpcUrl: '',
        isSoon: true
    },
    [NETWORK_HCC]: {
        icon: '/images/tokens/icon_token_hecochain.svg',
        name: 'HecoChain',
        color: '#4A9DFB',
        chainId: [],
        rpcUrl: '',
        isSoon: true
    }
}
