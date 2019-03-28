import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import initialState from '../config/initialState.config';
import configureStore from '../config/store.config';
import { ROUTES } from '../config/constants';

import AppLayout from './App.layout';
import App from '../components/containers/App';

import LoginLayout from './Login.layout';


export const reduxStore = configureStore({ initialState });

const AppRouter = () => (
	<Provider store={reduxStore}>
		<Router history={browserHistory}>
			<Route path="/" component={AppLayout} >	

				<IndexRoute component={LoginLayout} />
				
				<Route path={ROUTES.APP_LAYOUT} component={App}>

					<Route path={ROUTES.USER_MANAGEMENT_LAYOUT} getComponent={() => System.import('./User.layout').then(c => c.default) } />
					<Route path={ROUTES.INSPECTION_LAYOUT} getComponent={() => System.import('./Inspection.layout').then(c => c.default) } />
					<Route path={ROUTES.IMAGERY_LAYOUT} getComponent={() => System.import('./Imagery.layout').then(c => c.default)} />
				</Route>									
				
			</Route>
		</Router>
	</Provider>
);


export default AppRouter;