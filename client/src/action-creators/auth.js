
import jwtDecode from 'jwt-decode';

import { authApiFactory } from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import * as utils from '../config/utils';


export const fetchJWToken = (username, password) => {
    return dispatch => {
        const api = authApiFactory.get(authApiFactory.API_TABLE.GET_TOKEN);

        const body = JSON.stringify({
            data: {
                attributes: {
                    username,
                    password
                }
            }
        });

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { meta } = resJson;

            dispatch(saveJWToken(meta.token));
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const saveJWToken = (token) => {
    return {
        type: `SAVE_JWT_TOKEN`,
        payload: {
            token: token
        }
    }
};

export const deleteJWToken = () => {
    return {
        type: `DELETE_JWT_TOKEN`
    };
};

export const deleteAllState = () => {
    return {
        type: 'DELETE_ALL_STATE'
    };
};