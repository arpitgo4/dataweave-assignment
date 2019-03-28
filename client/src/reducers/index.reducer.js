
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import initialState from '../config/initialState.config';

import { userReducer } from './user';
import { authReducer } from './auth';
import { inspectionReducer } from './inspection';
import { miscReducer } from './misc';


const appReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	inspections: inspectionReducer,
	misc: miscReducer,
	notifications,
});

const rootReducer = (state = {}, action) => {

	if (action.type === 'DELETE_ALL_STATE')
		return initialState;

	return appReducer(state, action);
};

export default rootReducer;