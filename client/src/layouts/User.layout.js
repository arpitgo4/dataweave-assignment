
import React from 'react';
import { connect } from 'react-redux';

import UserTable from '../components/User/User-Table';


class UserLayout extends React.Component {

	render(){
		return (
            <div className="row">   
                <div className="col-md-12">
                    <UserTable />
                </div>           
            </div>
		);
	}
}

export default connect()(UserLayout);