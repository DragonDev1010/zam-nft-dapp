import {NETWORK_BSC, NETWORK_ETH} from "@src/constants";

export const GRAPH_URL = {
    [NETWORK_ETH]: 'https://api.thegraph.com/subgraphs/name/zambit/zamgraph',
    // [NETWORK_ETH]: 'https://api.thegraph.com/subgraphs/id/QmNt2uPtMx7yq6VcoPBnWfzezwzhtTZHyQyihg8QK34FX6',
    [NETWORK_BSC]: 'https://api.thegraph.com/subgraphs/name/zambit/zamgraphbsc',
    // [NETWORK_BSC]: 'https://api.thegraph.com/subgraphs/id/QmNt2uPtMx7yq6VcoPBnWfzezwzhtTZHyQyihg8QK34FX6'
    PAIR: 'https://api.thegraph.com/subgraphs/name/zambit/zampairgraph'
};
