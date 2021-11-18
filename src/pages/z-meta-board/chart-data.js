import {MONTH_NAMES, NETWORK_ETH} from "@src/constants";
import Web3 from "web3";
import {GRAPH_URL} from "@src/config";
import {formatChartDate, toFixed, int} from "@src/utils";

const offset24h = parseInt(Date.now() / 1000 - 24*60*60);
const offsetWeek = parseInt(Date.now() / 1000 - 24*60*60*7);
const offsetMonth = parseInt(Date.now() / 1000 - 24*60*60*30);
const offsetYear = parseInt(Date.now() / 1000 - 24*60*60*365);

const getRangeQuery = (range, offset) => `{
              circulation${range}Datas(first: 1000, orderBy: id, orderDirection: asc, where: {timestamp_gt: ${offset}}) {
                timestamp
                circulation
              },
              transfer${range}Datas(first: 1000, orderBy: id, orderDirection: asc, where: {timestamp_gt: ${offset}}) {
                timestamp
                totalTransferred
              },
              blocked${range}Datas(first: 1000, orderBy: id, orderDirection: asc, where: {timestamp_gt: ${offset}}) {
                timestamp
                blocked
              },
              transaction${range}Counts(first: 1000, orderBy: id, orderDirection: asc, where: {timestamp_gt: ${offset}}) {
                timestamp
                totalCount
              },
              circulations(where: {id: "singleton"}) {
                id
                circulation
              }
              transferCounts(where: {id: "singleton"}) {
                id
                totalTransferred
              }
              holderCounts(where: {id: "singleton"}) {
                id
                count
              }
              
            }`;

const rangeMapQuery = (range) => {
    switch (range) {
        case 'day':
            return {
                rangeQuery: 'Hour',
                offset: offset24h
            }
        case 'week':
            return {
                rangeQuery: 'Hour',
                offset: offsetWeek
            }
        case 'month':
            return {
                rangeQuery: 'Day',
                offset: offsetMonth
            }
        case 'all':
            return {
                rangeQuery: 'Day',
                offset: offsetYear
            }
    }
}

const rangeDateFormat = (range) => {
    switch (range) {
        case 'day':
        case 'week':
            return 'M d, h';
        case 'month':
        case 'all':
            return 'M d';
    }
}

export const zamGraphData = (network, range) => {
    const apiUrl = GRAPH_URL[network];
    const {rangeQuery, offset} = rangeMapQuery(range);
    const rangeDate = rangeDateFormat(range);

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: getRangeQuery(rangeQuery, offset)})
    })
        .then(response => response.json())
        .then(response => {
            const circulations = {};
            response.data[`circulation${rangeQuery}Datas`].forEach(
                ({timestamp, circulation}) => circulations[formatChartDate(timestamp, rangeDate)] = parseInt(Web3.utils.fromWei(circulation))
            );

            const transferred = {};
            response.data[`transfer${rangeQuery}Datas`].forEach(
                ({timestamp, totalTransferred}) => transferred[formatChartDate(timestamp, rangeDate)] = parseInt(Web3.utils.fromWei(totalTransferred))
            );

            const blockeds = {};
            response.data[`blocked${rangeQuery}Datas`].forEach(
                ({timestamp, blocked}) => blockeds[formatChartDate(timestamp, rangeDate)] = parseInt(Web3.utils.fromWei(blocked))
            );

            const transactions = {};
            response.data[`transaction${rangeQuery}Counts`].forEach(
                ({timestamp, totalCount}) => transactions[formatChartDate(timestamp, rangeDate)] = totalCount
            );

            const circulationsSupply = {};
            response.data.circulations.forEach(
                ({id, circulation}) => circulationsSupply[id] = parseInt(Web3.utils.fromWei(circulation))
            );

            const transferCounts = {};
            response.data.transferCounts.forEach(
                ({id, totalTransferred}) => transferCounts[id] = parseInt(Web3.utils.fromWei(totalTransferred))
            );

            const holderCounts = {};
            response.data.holderCounts.forEach(
                ({id, count}) => holderCounts[id] = count
            );

            return {
                circulations,
                transferred,
                blockeds,
                transactions,
                circulationsSupply,
                transferCounts,
                holderCounts
            }
        });
}

const getPairQuery = `{
  pairs {
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    reserve0
    reserve1
  }
}`;


export const zamGraphPairData = () => {
    const apiUrl = GRAPH_URL.PAIR;

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: getPairQuery})
    })
        .then(response => response.json())
        .then(response => {

            let reserve = 0;
            response.data.pairs
                .filter(item => item.token0.symbol === 'USDT' && item.token1.symbol === 'ZAM')
                .map(item => reserve = parseInt(item.reserve0));

            return {
                reserve
            }
        });
}
