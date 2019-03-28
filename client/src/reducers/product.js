
export const productReducer = (state = {}, action) => {

    switch (action.type) {
        
        case 'SAVE_PRODUCTS': {
            const products = action.payload.products.map(p => {
                delete p.meta;
                delete p.__v;
                return p;
            });

            return products;
        };

        default: return state;
    }
};