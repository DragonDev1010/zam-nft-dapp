import {coinMarketApi} from "@src/config";
import {formatChartDate, toFixed} from "@src/utils";

export const getPrice = (setRate, setPriceChange24, setPriceChangePercentage24, setVolume24) => {
    fetch(`${coinMarketApi}?type=price`)
        .then((response) => {
            return response.json();
        }).then((data) => {
        setRate(data['zam-io'].usd);
        setVolume24(data['zam-io'].usd_24h_vol);
        setPriceChange24(data['zam-io'].usd * data['zam-io'].usd_24h_change / 100);
        setPriceChangePercentage24(toFixed(data['zam-io'].usd_24h_change, 1000));
    });
}

export const getMarketData = (setMarketData, setMarketDataTotal) => {
    fetch(`${coinMarketApi}?type=market`)
        .then((response) => {
            return response.json();
        }).then((data) => {

        let marketDataTotal = 0;

        const marketData = data['total_volumes'].map(
            ([timestamp, count]) => {
                const intCount = parseInt(count)
                marketDataTotal += intCount;

                return {
                    name: formatChartDate(timestamp / 1000, 'M d'),
                    USD: intCount
                }
            }
        );

        setMarketDataTotal(marketDataTotal);
        setMarketData(marketData);
    });
}
