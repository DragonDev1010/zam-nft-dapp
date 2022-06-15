import axios from "axios";
import { setToken, getAccessToken, getRefreshToken, clearToken, clearUserLocal } from "../services/LocalStorageService";

export const SSO_API_URL_REGISTER = process.env.SSO_REGISTER
export const SSO_API_RESET_PASSWORD = process.env.SSO_RESET_PASSWORD
export const SSO_API_RECOVER_PASSWORD = process.env.SSO_RECOVER_PASSWORD
export const SSO_API_CHANGE_PASSWORD = process.env.SSO_CHANGE_PASSWORD
export const SSO_API_RESET_EMAIL = process.env.SSO_RESET_EMAIL
export const SSO_API_RECOVER_EMAIL = process.env.SSO_RECOVER_EMAIL
export const SSO_API_URL_TOKEN = process.env.SSO_TOKEN
export const SSO_API_SSO_USER_INFO = process.env.SSO_USER_INFO
export const SSO_API_RESET_NAME = process.env.SSO_RESET_NAME
export const SSO_API_RESET_TELEGRAM = process.env.SSO_RESET_TELEGRAM

const ssoApi = axios.create({
    baseURL: SSO_API_URL_TOKEN
});

ssoApi.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
    
}, error => {
    return Promise.reject(error);
});
ssoApi.interceptors.response.use((response) => {
    return response
}, 
    function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            return axios.post(SSO_API_URL_TOKEN,
                `grant_type=refresh_token&` +
                `client_secret=738EADEE49129DF79F6C3E549C646&client_id=3B363F4611963862&scope=zampad offline_access&refresh_token=${refreshToken}`,
                config
            )
            .then(res => {
                if (res.status === 200) {
                    setToken(res.data);
                    originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
                    return axios(originalRequest);
                }
            })
            .catch(error => {
                console.log('Token not available ', error)
                clearToken()
                clearUserLocal()
                window.location.pathname = "/login";
            })
        }

        return Promise.reject(error);
    }
);

export default ssoApi;
 