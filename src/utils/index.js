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


export function toFixed(number) {
    return Math.round(number* 100000000 ) / 100000000
}

export function sortTokens(tokenA, tokenB) {
    const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
    return [token0, token1];
}
