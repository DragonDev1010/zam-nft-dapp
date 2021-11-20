import {NETWORK_BSC, NETWORK_ETH} from "@src/constants";

export const GRAPH_URL = {
    [NETWORK_ETH]: process.env.GRAPH_URL_ETH,
    [NETWORK_BSC]: process.env.GRAPH_URL_BSC,
    PAIR: process.env.GRAPH_URL_PAIR,
};

export const ZAM_API_URL = process.env.ZAM_API_URL;
