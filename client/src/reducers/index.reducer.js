
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import initialState from '../config/initialState.config';

import { productReducer } from './product';


const appReducer = combineReducers({
	products: productReducer,
	notifications,
});

const rootReducer = (state = {}, action) => {

	if (action.type === 'DELETE_ALL_STATE')
		return initialState;

	return appReducer(state, action);
};

export default rootReducer;