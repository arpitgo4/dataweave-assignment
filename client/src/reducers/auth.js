
import jwtDecode from 'jwt-decode';

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        
        case 'SAVE_JWT_TOKEN': {
            const { token } = action.payload;
            return {
                ...state,
                logged_in_user: jwtDecode(token),
                token
            };
        };

        case 'DELETE_JWT_TOKEN': {
            return {
                ...state,
                logged_in_user: undefined,
                token: ''
            };
        };

        case 'AUTH__START_LOADING': {
            return {
                ...state,
                misc: {
                    is_loading: true
                }
            };
        };

        case 'AUTH__DONE_LOADING': {
            return {
                ...state,
                misc: {
                    is_loading: false
                }
            };
        };

        default: return state;
    }

};