
import { LS_JWT_TOKEN_KEY, LS_USER_KEY } from './constants';


const getItem = key => {
    const item = localStorage.getItem(key);
    
    if (!item) return item;
    else return JSON.parse(item);
}; 

const setItem = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

const removeItem = key => localStorage.removeItem(key);


/**
 * JWT Token Local Storage Utils
 */
export const saveTokenInLS = token => setItem(LS_JWT_TOKEN_KEY, token);

export const removeTokenFromLS = () => removeItem(LS_JWT_TOKEN_KEY);

export const getTokenFromLS = () => getItem(LS_JWT_TOKEN_KEY);


/**
 * User Data Local Storage Utils
 */
export const saveUserInLS = user => setItem(LS_USER_KEY, user);

export const removeUserFromLS = () => removeItem(LS_USER_KEY);

export const getUserFromLS = () => getItem(LS_USER_KEY);