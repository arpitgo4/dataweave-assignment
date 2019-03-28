
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notification from '../components/containers/Notifications';

class AppLayout extends Component {
	render(){
		return (
		    <div id="app-container" >
				<div>   
					<div>
						<Notification />
						{this.props.children}
					</div>           
				</div>
            </div>
		);
	}
}

export default connect()(AppLayout);