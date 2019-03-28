
import { userApiFactory } from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import * as utils from '../config/utils';


const startLoading = () => {
    return {
        type: 'USER__START_LOADING'
    };
};

const doneLoading = () => {
    return {
        type: 'USER__DONE_LOADING'
    };
};

export const getUsers = () => {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_ALL_USERS);

        return fetch(api.url, { 
            method: api.type
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            dispatch({
                type: `SAVE_USERS`,
                payload: { 
                    users: data.map(d => d.attributes)
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const getUser = uid => {
    return (dispatch, getState) => {
        const { users } = getState().user;
        const user_already_exists = users && users.some(user => user.uid === uid);

        console.log(user_already_exists, uid);

        if (user_already_exists)
            return Promise.resolve(users.find(user => user.uid === uid)); 

        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_USER_BY_ID, { id: uid });

        return fetch(api.url, { 
            method: api.type
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            console.log(data);

            dispatch({
                type: `SAVE_USER`,
                payload: { 
                    user: data.attributes
                }
            });

            return data.attributes;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};


export const createUser = (user) => {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.POST_USER);
        const body = JSON.stringify({
            data: {
                attributes: user
            }
        });

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            console.log(data);

            dispatch({
                type: `SAVE_USER`,
                payload: { 
                    user: data.attributes
                }
            });

            return data.attributes;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const updateUser = (user) =>  {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.PUT_UPDATE_USER);
        const body = JSON.stringify({
            data: {
                attributes: user
            }
        });

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            dispatch({
                type: `UPDATE_USER`,
                payload: { 
                    user: data.attributes
                }
            });

            return data.attributes;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const removeUser = (user) => {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.DELETE_USER);
        const body = JSON.stringify({
            data: {
                attributes: user
            }
        });

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            console.log(data);

            dispatch({
                type: `REMOVE_USER`,
                payload: { 
                    user: data.attributes
                }
            });

            return data.attributes;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const removeAllUsers = () => {
    return {
        type: 'REMOVE_ALL_USERS',
    }
};