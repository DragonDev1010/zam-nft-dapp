import {MONTH_NAMES, NETWORK_BSC, NETWORK_ETH, NETWORKS} from "@src/constants";

export function dec2hex(str) {
    const dec = str.toString().split(''), sum = [], hex = [];
    let i, s;
    while (dec.length) {
        s = 1 * dec.shift();
        for (i = 0; s || i < sum.length; i++) {
            s += (sum[i] || 0) * 10;
            sum[i] = s % 16;
            s = (s - sum[i]) / 16
        }
    }
    while (sum.length) {
        hex.push(sum.pop().toString(16))
    }
    return hex.join('')
}


export function toFixed(number, precision = 100000000) {
    return Math.round(number * precision) / precision
}

export function sortTokens(tokenA, tokenB) {
    const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
    return [token0, token1];
}

export function float(value) {
    return ['0', '0.', '0,'].includes(value.toString()) ? value : parseFloat(value.toString().replace(/,/g, '.'));
}

export function int(value) {
    if (!value) {
        return 0;
    }
    return parseInt(float(value));
}

export function formatChartDate(timestamp, range = 'M d, h:m') {
    const date = new Date(timestamp * 1000);

    switch (range) {
        case 'M d, h':
            return `${MONTH_NAMES[date.getMonth()]}. ${date.getDate()}, ${date.toLocaleString('ru-RU', {
                hour: 'numeric',
                hour24: true
            })}:00`
        case 'M d':
            return `${MONTH_NAMES[date.getMonth()]}. ${date.getDate()}`
        case 'hour':
            return `${MONTH_NAMES[date.getMonth()]}. ${date.getDate()}, ${date.toLocaleString('ru-RU', {
                hour: 'numeric',
                hour24: true
            })}:00`
        case 'day':
        case 'week':
            return `${MONTH_NAMES[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`
    }
}

export function mergeObjects(ob1, ob2) {
    const merged = {};

    Object.keys(ob1).map(key => {
        if (typeof ob1[key] === 'object') {
            const stockSum = {...ob1[key]};
            let instersection = 0;
            Object.keys(ob2[key]).forEach(name => {
                if (stockSum[name]) {
                    stockSum[name] = parseInt(stockSum[name]) + parseInt(ob2[key][name]);
                    instersection = stockSum[name];
                } else {
                    stockSum[name] = parseInt(ob2[key][name]) + instersection;
                }
            });

            merged[key] = Object.entries(stockSum)
                .sort(([,a],[,b]) => a-b)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        }
    })

    return merged;
}

export function prepareGraphArray(obj, amountKey) {
    const graphArray = [];

    for (let [key, value] of Object.entries(obj).sort()) {
        graphArray.push({name: key, [amountKey]: value})
    }
    return graphArray;
}

export function extractGraphDataByNetwork(object, name, amountKey, network) {
    if (!object) {
        return [];
    }
    const data = network ? object[network][name] : object.pair[name];
    return prepareGraphArray(data, amountKey);
}

export function numberFormat(value) {
    if (!value) {
        return value;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
