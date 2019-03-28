import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import initialState from '../config/initialState.config';
import configureStore from '../config/store.config';
import { ROUTES } from '../config/constants';

import AppLayout from './App.layout';
import App from '../components/containers/App';

export const reduxStore = configureStore({ initialState });

const AppRouter = () => (
	<Provider store={reduxStore}>
		<Router history={browserHistory}>
			<Route path="/" component={AppLayout}>
				<IndexRoute component={App} />
			</Route>		
		</Router>
	</Provider>
);


export default AppRouter;