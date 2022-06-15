import React, { useState, useContext, createContext } from 'react'
import { useHistory } from "react-router-dom";

import { 
    SSO_API_URL_TOKEN, 
    SSO_API_RECOVER_EMAIL, 
    SSO_API_RESET_PASSWORD,
    SSO_API_RECOVER_PASSWORD
 } from "@src/config";

import { setToken, clearToken, clearUserLocal } from "../services/LocalStorageService";

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}> { children } </authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [error, setError] = useState()
    const history = useHistory();

    const signin = async (credentials) => {
        return await fetch(SSO_API_URL_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 
                `grant_type=password&username=${credentials.userName}&password=${credentials.password}&` +
                'client_secret=738EADEE49129DF79F6C3E549C646&client_id=3B363F4611963862&scope=zampad offline_access'
        })
        .then(res => res.json())
        .then(json => {
            if (json.refresh_token) {
                setToken(json)
            }
            return json
        })
        .catch(error => {
            console.log('error', error)
        })    
    }

    const resetPassword = async (credentials) => {
        return await fetch(SSO_API_RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify({
                email: credentials.email
            })
        })
        .then(res => {
            if(res.ok) {
                return res;
            }
            throw new Error('Network response was not ok.');
        })
        .catch(error => {
            return error
        })
    }

    const recoverPassword = async (password, token, userId) => {
        return await fetch(SSO_API_RECOVER_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify({
                token: token,
                userId: userId,
                password: password
            })
        })
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log('error', error)
        })
    }

    const recoverEmail = async (token, userId, email) => {
        return await fetch(SSO_API_RECOVER_EMAIL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify({
                token: token,
                userId: userId,
                email: email
            })
        })
        .catch(error => {
            console.log('error', error)
            alert(error.message)
        })
    }

    const logout = async () => {
        await clearToken()
        await clearUserLocal()
    }
  
    return {
      error,
      signin,
      resetPassword,
      recoverPassword,
      recoverEmail,
      logout
    }
}