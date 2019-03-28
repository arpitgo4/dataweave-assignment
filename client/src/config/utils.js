
import { browserHistory } from 'react-router';
import * as moment from 'moment';

import { removeTokenFromLS, removeUserFromLS } from './local-storage';


export const errorHandler = response => {
    if (!response.ok) {
        return response.json()
        .then(jsonErr => {
            console.log('jsonerr....', JSON.stringify(jsonErr));
            const error = jsonErr.message || jsonErr.errors[0].message || 'something went wrong!';

            if (error === 'jwt expired') {
                browserHistory.replace('/');
                removeTokenFromLS();
                removeUserFromLS();
            }

            return Promise.reject({ message: error });
        });
    }

    return response.json();
};


export const format_route = (route, params) => {
    let formatted_route = route;
    if (params) {
        Object.keys(params).forEach(key => {
            const value = params[key];
            formatted_route = formatted_route.replace(`:${key}`, value);
        });
    }

    return formatted_route;
};

export const string_sorter = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

export const parseDateToTimeStamp = strDate => {
    const date = Date.parse(strDate);
    return date/1000;
};

export const parseMomentToUnixTimeStamp = m => {
    return Math.floor(m.valueOf()/1000);
};

export const parseUnixTimestampToMoment = timestamp => {
    return moment.unix(timestamp);
};

export const parseUnixTimestampToString = (timestamp, format = 'MM/DD/YYYY hh:mm A') => {
    const m = parseUnixTimestampToMoment(timestamp);
    return m.format(format);
};

export const convertObjectToArray = obj => {
    return Object.keys.reduce((acc, key) => {
        const value = obj[key];
        acc.push(value);
        return acc;
    }, []);
};


const getValueFromObject = (object, key) => {
    const keys = key.split('.');

    return keys.reduce((acc, k) => {
        return acc[k];
    }, object);
};