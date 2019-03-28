
import fetchIntercept from 'fetch-intercept';
import jwtDecode from 'jwt-decode';

import { reduxStore } from '../layouts/App.Router';
import { saveJWToken } from '../action-creators/auth';
import { JWT_TOKEN_HEADER } from '../config/constants';
import { getTokenFromLS, saveTokenInLS, saveUserInLS } from './local-storage';


const { dispatch, getState } = reduxStore;

const unregister = fetchIntercept.register({
    request: function (url, config) {
        if (!config.headers) 
            config.headers = {};

        config.headers[JWT_TOKEN_HEADER] = getTokenFromLS();
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occurred during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the response object
        const _response = response.clone();

        _response.json()
        .then(jsonRes => {
            const { meta } = jsonRes;
            if (meta && meta.token) {
                dispatch(saveJWToken(meta.token));
                
                saveTokenInLS(meta.token);
                saveUserInLS(jwtDecode(meta.token));
            }
        });

        return response;
    },

    responseError: function (error) {
        console.log('error recevied in responseError', error);
        return Promise.reject(error);
    }
});
