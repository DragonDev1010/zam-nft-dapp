import { 
    ZAM_API_URL, 
    SSO_API_URL_REGISTER, 
    SSO_API_CHANGE_PASSWORD, 
    SSO_API_SSO_USER_INFO, 
    SSO_API_RESET_EMAIL,
    SSO_API_RESET_NAME,
    SSO_API_RESET_TELEGRAM,
} from "@src/config";
import ssoApi from '../config/sso'
import { formatChartDate, toFixed } from "@src/utils";

export const getPrice = (setRate, setPriceChange24, setPriceChangePercentage24, setVolume24) => {
    fetch(`${ZAM_API_URL}?type=price`)
        .then((response) => {
            return response.json();
        }).then((data) => {
        setRate(data['zam-io'].usd);
        setVolume24(data['zam-io'].usd_24h_vol);
        setPriceChange24(data['zam-io'].usd * data['zam-io'].usd_24h_change / 100);
        setPriceChangePercentage24(toFixed(data['zam-io'].usd_24h_change, 3));
    });
}

export const getMarketData = (setMarketData, setMarketDataTotal) => {
    fetch(`${ZAM_API_URL}?type=market`)
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

export const registerUser = async (credentials) => {
    return await fetch(SSO_API_URL_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            userName: credentials.userName,
            password: credentials.password
        })
    })
    .then(res => res.json())
    .then(json => {
        return json
    })
    .catch(error => {
        console.log('error', error)
        alert(error.message)
    })   
}


export const changePassword = async (credentials) => {
    return await ssoApi.post(SSO_API_CHANGE_PASSWORD, {
        oldPassword: credentials.oldPassword,
        newPassword: credentials.newPassword
    })
    .catch(error => {
        console.log('error', error)
        alert(error.message)
    })
}



export const getUserInfo = async() => {
    return await ssoApi.get(SSO_API_SSO_USER_INFO)
    .catch(error => {
        console.log('error', error)
        alert(error.message)
    })
}

export const resetUserEmail = async (email) => {
    await ssoApi.post(SSO_API_RESET_EMAIL, {
        email: email
    })
    .catch(error => {
        console.log('error', error)
        alert(error.message)
    })
}

export const resetDisplayName = async (name) => {
    return await ssoApi.patch(SSO_API_RESET_NAME, {
        displayName: name
    })
    .then(res => {
        return res
    })
}

export const resetTelegram = async (username) => {
    return await ssoApi.patch(SSO_API_RESET_TELEGRAM, {
        telegram: username
    })
    .then(res => {
        return res
    })
    .catch(err => console.log('error', err))
}
