
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => {},
    userId: -1,
    updateUserId: () => {},
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [userId, setUserId] = useState(initialContext.userId);

    useEffect(() => {
        const loggedIn = Cookies.get('loggedIn') === 'true';
        const userIdFromCookie = Cookies.get('userId');

        if (loggedIn && userIdFromCookie) {
            setLoginStatus(true);
            setUserId(parseInt(userIdFromCookie));
        }
    }, []);

    const updateLoginStatus = (newStatusValue) => {
        setLoginStatus(newStatusValue);
        Cookies.set('loggedIn', newStatusValue, { expires: 7 }); 
    };

    const updateUserId = (id) => {
        setUserId(id);
        Cookies.set('userId', id); 
    };

    const value = {
        loginStatus,
        updateLoginStatus,
        userId,
        updateUserId,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}
