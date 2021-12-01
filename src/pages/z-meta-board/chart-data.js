import {NETWORK_ETH} from "@src/constants";
import {GRAPH_URL} from "@src/config";
import {timestampToString, fromWei, mergeObjects} from "@src/utils";

const offset24h = parseInt(Date.now() / 1000 - 24*60*60);
const offsetWeek = parseInt(Date.now() / 1000 - 24*60*60*7);
const offsetMonth = parseInt(Date.now() / 1000 - 24*60*60*30);
const offsetYear = parseInt(Date.now() / 1000 - 24*60*60*365);

const getRangeQuery = (range, offset, network) => `{
              ${
                network === NETWORK_ETH ?
                    `
                    bridgeTotalAll: bridges(where: {id:"singleton"}) {
                        id
                        totalTransferred
                    }
                    bridgeTotal: bridgeETHs(where: {id: "singleton"}) {
                        id
                        transferredToETH
                    }
                    bridgeData: bridgeETHDayDatas(first: 500, orderBy: id, orderDirection: desc) {
                        timestamp
                        transferredToETH
                    }
                    ` : 
                    `
                    bridgeTotal: bridgeBSCs(where: {id: "singleton"}) {
                        id
                        transferredToBSC
                    }
                    bridgeData: bridgeBSCDayDatas(first: 500, where: {id_not: "singleton"}, orderBy: id, orderDirection: desc) {
                        timestamp
                        transferredToBSC
                    }
                    stackersTotal: stackerCounts(where: {id: "singleton"}) {
                        id
                        totalStake
                    }
                    `
              }
    
              totalSupplies(where: {id:"singleton"}) {
                 id
                 supply
              }
              circulationsTotal: circulations(where: {id: "singleton"}) {
                id
                circulation
              }
              holderCountsTotal: holderCounts(where: {id: "singleton"}) {
                id
                count
              }
              holderCountsData: holderDayCounts(first: 500, orderBy: id, orderDirection: desc) {
                timestamp
                totalCount
              }
              participantCountsTotal: participantCounts(where: {id: "singleton"}) {
                id
                count
              }
              participantCountsData: participantDayCounts(first: 500, orderBy: id, orderDirection: desc) {
                timestamp
                totalCount
              }
              transferTotal: transferCounts(where:{id: "singleton"}) {
                id
                count
                totalTransferred
              }
              transferData: transferDayDatas(first: 500, orderBy: timestamp) {
                timestamp
                count
                transferred
              }
              
              transactionTotal: transactionCounts(where:{id: "singleton"}) {
                id
                count
              }
              transactionData: transactionDayCounts(first: 500, orderBy: timestamp) {
                timestamp
                count
              } 
              vestingCountsTotal: vestingCounts(where:{id: "singleton"}) {
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
                rangeQuery: 'Week',
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

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: getRangeQuery(rangeQuery, offset, network)})
    })
        .then(response => response.json())
        .then(response => {


            const vestingCountsTotal = {};
            response.data.vestingCountsTotal.forEach(
                ({id, count}) => vestingCountsTotal[id] = count
            );

            const transactionTotal = {};
            response.data.transactionTotal.forEach(
                ({id, count}) => transactionTotal[id] = count
            );

            const transactionData = {};
            response.data.transactionData.forEach(
                ({timestamp, count}) => transactionData[timestampToString(timestamp)] = count
            );

            const transferTotal = {};
            response.data.transferTotal.forEach(
                ({id, count}) => transferTotal[id] = count
            );

            const transferData = {};
            response.data.transferData.forEach(
                ({timestamp, count}) => transferData[timestampToString(timestamp)] = count
            );

            const transferZamTotal = {};
            response.data.transferTotal.forEach(
                ({id, totalTransferred}) => transferZamTotal[id] = fromWei(totalTransferred)
            );

            const transferZamData = {};
            response.data.transferData.forEach(
                ({timestamp, transferred}) => transferZamData[timestampToString(timestamp)] = fromWei(transferred)
            );

            const bridgeTotalAll = {};
            response.data.bridgeTotalAll?.forEach(
                ({id, totalTransferred}) => bridgeTotalAll[id] = fromWei(totalTransferred)
            );

            const bridgeTotal = {};
            response.data.bridgeTotal.forEach(
                (item) => bridgeTotal[item.id] = fromWei(item[`transferredTo${network.toUpperCase()}`])
            );

            const bridgeData = {};
            response.data.bridgeData.forEach(
                (item) => bridgeData[timestampToString(item.timestamp)] = fromWei(item[`transferredTo${network.toUpperCase()}`])
            );

            const circulationsTotal = {};
            response.data.circulationsTotal.forEach(
                ({id, circulation}) => circulationsTotal[id] = fromWei(circulation)
            );

            const holderCountsTotal = {};
            response.data.holderCountsTotal.forEach(
                ({id, count}) => holderCountsTotal[id] = count
            );

            const holderCountsData = {};
            response.data.holderCountsData.forEach(
                ({timestamp, totalCount}) => holderCountsData[timestampToString(timestamp)] = totalCount
            );

            const totalSupplies = {};
            response.data.totalSupplies.forEach(
                ({id, supply}) => totalSupplies[id] = fromWei(supply)
            );

            const participantCountsTotal = {};
            response.data.participantCountsTotal.forEach(
                ({id, count}) => participantCountsTotal[id] = count
            );

            const participantCountsData = {};
            response.data.participantCountsData.forEach(
                ({timestamp, totalCount}) => participantCountsData[timestampToString(timestamp)] = totalCount
            );

            const stackersTotal = {};
            response.data.stackersTotal?.forEach(
                ({id, totalStake}) => stackersTotal[id] = fromWei(totalStake)
            );

            const holderAllTimeTotal = mergeObjects({key: holderCountsTotal}, {key: participantCountsTotal}).key;
            const holderAllTimeData = mergeObjects({key: holderCountsData}, {key: participantCountsData}).key;

            return {
                circulationsTotal,
                holderCountsTotal,
                holderCountsData,
                totalSupplies,
                bridgeTotalAll,
                bridgeTotal,
                bridgeData,
                holderAllTimeTotal,
                holderAllTimeData,
                transferTotal,
                transferData,
                transactionTotal,
                transactionData,
                transferZamTotal,
                transferZamData,
                vestingCountsTotal,
                stackersTotal,
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
