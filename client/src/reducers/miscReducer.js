
export const miscReducer = (state = {}, action) => {

    switch (action.type) {
        
        case 'SAVE_TOTAL_PRODUCT_COUNTER': {
            return {
                ...state,
                total_product_count: action.payload.total_product_count,
            };
        };

        case 'SAVE_DISTINCT_OPTIONS': {
            return {
                ...state,
                [action.payload.col_name]: action.payload.distinct_options,
            };
        }

        default: return state;
    }
};