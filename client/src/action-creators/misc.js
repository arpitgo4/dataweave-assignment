

import { 
    miscApiFactory,
} from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import * as utils from '../config/utils';


export const getCompanies = () => {
    return dispatch => {
        const api = miscApiFactory.get(miscApiFactory.API_TABLE.GET_COMPANIES);

        return fetch(api.url, { 
            method: api.type,
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            dispatch({
                type: 'SAVE_COMPANIES',
                payload: {
                    companies: data.map(d => d.attributes),
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const saveInspectionFilterInRedux = (type, value) => {
    return {
        type: 'UPDATE_INSPECTION_FILTER',
        payload: {
            key: `selected_${type}`, 
            value,
        },
    };
};

export const saveInspectionTimstampsInRedux = (key, value) => {
    return {
        type: `UPDATE_INSPECTION_FILTER`,
        payload: {
            key, value,
        }
    };
};