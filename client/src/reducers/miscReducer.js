
export const miscReducer = (state = {}, action) => {

    switch (action.type) {
        
        case 'SAVE_TOTAL_PRODUCT_COUNTER': {
            return {
                ...state,
                total_product_count: action.payload.total_product_count,
            };
        };

        default: return state;
    }
};