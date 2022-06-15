import {MONTH_NAMES, NETWORK_BSC, NETWORK_ETH, NETWORKS} from "@src/constants";
import Web3 from "web3";

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


export function toFixed(number, precision = 4) {
    if (!number) {
        return number;
    }
    const regexpStr = `^-?\\d+(?:\\.\\d{0,${precision}})?`;
    const regexp = new RegExp(regexpStr);
    return parseFloat(number.toString().match(regexp)[0]);
}

export function sortTokens(tokenA, tokenB) {
    const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
    return [token0, token1];
}

export function float(value) {
    if (value === undefined) {
        return '';
    }

    if (value === 0) {
        return '0.';
    }
    if (value === '') {
        return 0;
    }

    return /^(\d+(\.|,)?\d{0,}?)$/u.test(value.toString())
        ? value.toString().replace(/,/g, '.')
        : parseFloat(value.toString().replace(/,/g, '.'));
}

export function int(value) {
    if (!value) {
        return 0;
    }
    return parseInt(value);
}

export function timestampToString(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toISOString().split('T')[0];
}

export function formatChartDate(timestamp, format = 'M d, h:m') {
    const date = new Date(timestamp * 1000);

    switch (format) {
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
            const stockSum = array_fill_keys(Object.keys({...ob1[key], ...ob2[key]}), 0);

            Object.keys(stockSum).forEach(name => {
                stockSum[name] = parseInt(ob1[key][name] ?? 0) + parseInt(ob2[key][name] ?? 0);
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

    Object.keys(obj).sort().map((key) => {
        const date = new Date(key);
        graphArray.push({name: `${MONTH_NAMES[date.getMonth()]}. ${date.getDate()}`, [amountKey]: obj[key]})
    })

    return graphArray;
}

export function extractGraphDataByNetwork(object, name, amountKey, network) {
    if (!object) {
        return [];
    }
    const data = network ? object[network][name] : object.pair[name];
    return prepareGraphArray(data, amountKey);
}

export function extractScalarDataByNetwork(object, name, network, firstKey = "singleton") {
    if (!object) {
        return 0;
    }
    return network ? object[network][name][firstKey] : object.pair[name][firstKey];
}

export function numberFormat(value) {
    if (!value) {
        return value;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const fromWei = (value) => {
    return parseInt(Web3.utils.fromWei(value?.toString()));
}

export function array_fill_keys(keys, value) {
    const retObj = {}
    let key = ''
    for (key in keys) {
        retObj[keys[key]] = value
    }
    return retObj
}

export function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
}
