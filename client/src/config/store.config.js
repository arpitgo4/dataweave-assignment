import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers/index.reducer';

const middlewares = [
	createLogger(),
	thunkMiddleware
];

export default function configureStore({ initialState }) {
	const initial_state_copy = JSON.parse(JSON.stringify(initialState));
	
	const store = createStore(rootReducer, initial_state_copy, applyMiddleware(...middlewares));

	if(module.hot){
		// enable webpack hot module replacement for reducers
		module.hot.accept('../reducers/index.reducer', () => {
			// `default` is to extract the default entity from the export. 
			const nextReducer = require('../reducers/index.reducer').default; 
			store.replaceReducer(nextReducer);
		});
 	}

 	return store;
}