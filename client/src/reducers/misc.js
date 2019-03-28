

export const miscReducer = (state = {}, action) => {
    switch (action.type) {

        case 'SAVE_COMPANIES': {
            const { companies } = action.payload;

            return {
                ...state,
                companies: companies.map(c => c.name) 
            }
        }

        case 'UPDATE_INSPECTION_FILTER': {
            const { key, value, } = action.payload;

            return {
                ...state,
                inspection_filters: {
                    ...state.inspection_filters,
                    [key]: value,
                },
            };
        };

        default: 
            return state;
    }
};