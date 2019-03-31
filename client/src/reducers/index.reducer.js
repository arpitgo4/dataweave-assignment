
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import initialState from '../config/initialState.config';

import { productReducer } from './product';
import { miscReducer } from './miscReducer';


const appReducer = combineReducers({
	products: productReducer,
	misc: miscReducer,
	notifications,
});

const rootReducer = (state = {}, action) => {

	if (action.type === 'DELETE_ALL_STATE')
		return initialState;

	return appReducer(state, action);
};

export default rootReducer;