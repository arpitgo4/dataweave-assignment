
import { inspectionApiFactory } from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import * as utils from '../config/utils';


export const getInspections = (start_timestamp, end_timestamp) => {
    return dispatch => {
        let api = undefined;
        if (start_timestamp && end_timestamp)
            api = inspectionApiFactory.get(inspectionApiFactory.API_TABLE.GET_INSPECTIONS_BY_TIMESTAMPS, { start_timestamp, end_timestamp });
        else api = inspectionApiFactory.get(inspectionApiFactory.API_TABLE.GET_INSPECTIONS);

        return fetch(api.url, { 
            method: api.type
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            dispatch({
                type: `SAVE_INSPECTIONS`,
                payload: { 
                    inspections: data.map(d => d.attributes)
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};


export const getInspection = (id) => {
    return dispatch => {
        const api = inspectionApiFactory.get(inspectionApiFactory.API_TABLE.GET_INSPECTION, { id });

        return fetch(api.url, { 
            method: api.type
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;
            
            dispatch({
                type: `SAVE_INSPECTION`,
                payload: { 
                    inspection: data.attributes,
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};

export const markGuestInspections = (inspection_ids, visible = true) => {
    return dispatch => {
        const api = inspectionApiFactory.get(inspectionApiFactory.API_TABLE.PUT_GUEST_INSPECTIONS);
        const body = JSON.stringify({
            data: inspection_ids,
            mark: visible,
        });

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body,
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data } = resJson;

            dispatch({
                type: `UPDATE_INSPECTIONS`,
                payload: { 
                    inspections: data.map(d => d.attributes)
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};