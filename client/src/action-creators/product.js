
import { productApiFactory } from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import { DEFAULT_PAGE_SIZE, } from '../config/constants'
import * as utils from '../config/utils';


export const getProducts = (offset = 0, limit = DEFAULT_PAGE_SIZE, title, sku, category, brand, source, subcategory, price_range, stock_status) => {
    return dispatch => {
        const query_params = { offset, limit, title, sku, category, brand, source, subcategory, price_range, stock_status, };

        const api = productApiFactory.get(productApiFactory.API_TABLE.GET_PRODUCTS, undefined, query_params);

        return fetch(api.url, { method: api.type })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data, meta, } = resJson;
            console.log(data);

            dispatch({
                type: `SAVE_PRODUCTS`,
                payload: { 
                    products: data.map(d => d.attributes)
                }
            });

            dispatch({
                type: `SAVE_TOTAL_PRODUCT_COUNTER`,
                payload: {
                    total_product_count: meta.total_product_count,
                }
            });

            return data;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};


export const getDistinctOptions = col_name => {
    return dispatch => {
        const query_params = { key: col_name };

        const api = productApiFactory.get(productApiFactory.API_TABLE.GET_DISTINCT_OPTIONS, undefined, query_params);

        return fetch(api.url, { method: api.type })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data, } = resJson;

            dispatch({
                type: `SAVE_DISTINCT_OPTIONS`,
                payload: { 
                    col_name,
                    distinct_options: data.map(d => d.attributes[col_name])
                }
            });

            return data;
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};