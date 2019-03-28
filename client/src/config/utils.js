
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

export const isAdminAuthorized = (admin, authority) => {
    if (!admin || !admin.authorities)
        return false;
        
    const { authorities } = admin;
    return authorities.some(auth => auth === authority);
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

export const jsonToCSV = (keys, data) => {
    const headers = keys.map(k => k.title).join(',') + '\n';
    
    const headers_table = keys.reduce((acc, k) => {
        const { dataIndex } = k;
        acc[dataIndex] = k.render;
        return acc;
    }, {});

    if (!Array.isArray(data))
        data = convertObjectToArray(data);

    return data.reduce((acc, dataObj) => {

        const data_str = Object.keys(headers_table)
            .reduce((_acc, dataIndex) => {
                const _value = getValueFromObject(dataObj, dataIndex);
                const _render = headers_table[dataIndex];

                if (_render)
                    _acc.push(_render(_value));
                else _acc.push(_value);

                return _acc;
            }, [])
            .join(',') + '\n';

        return acc + data_str;
    }, headers);
};

const getValueFromObject = (object, key) => {
    const keys = key.split('.');

    return keys.reduce((acc, k) => {
        return acc[k];
    }, object);
};

export const downloadFile = (filename, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}