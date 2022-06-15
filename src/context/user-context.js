import React, { useState, useEffect } from 'react';
import { getAccessToken, getUserLocal } from "@src/services/LocalStorageService";

export const UserContext = React.createContext();

export const userContextProps = () => {
    const {displayName, email} = getUserLocal();

    const [userObj, setUserObj] = useState({
        displayName: displayName,
        email: email
    });
    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            setUserObj()
        } 
    }, [])

    return {
        userObj,
        setUserObj
    }
}