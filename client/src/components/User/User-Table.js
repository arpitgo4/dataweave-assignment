
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, } from 'antd';

import DataTable from '../containers/DataTable';
import UserDrawer from './UserDrawer';
import { 
    getUsers,
    removeUser,
} from '../../action-creators/user';
import { showErrorNotification } from '../../action-creators/index.action-creator';
import { USER_COLUMNS } from '../../config/data-table-columns';

class UserTable extends Component {

    state = {
        selectedRowKeys: [],
        selectedRows: [],

        user_api_loading: false,

        drawer_visible: false,
        drawer_action: undefined, // 'adding', 'editing'
        drawer_title: undefined,
        drawer_user: undefined,
    };

    render() {
        const { users } = this.props;
        const { drawer_title, drawer_visible, drawer_action, drawer_user, } = this.state;

        return (
            <div>
                <div>
                    {this._renderUserTable.bind(this)(users)}
                </div>
                <UserDrawer 
                    onClose={this._onClose.bind(this)}
                    title={drawer_title} 
                    action={drawer_action}
                    user={drawer_user}
                    visible={drawer_visible} />
            </div>
        );
    }

    _onClose() {
        this.setState({
            drawer_visible: false
        });
    }

    _renderUserTable(users) {
        const { user_api_loading, } = this.state;

        const search_keys = [ 
            { key: 'username', text: 'Username' }, 
            { key: 'email', text: 'Email Id' },
            { key: 'role', text: 'Role' }, 
        ];

        return (
            <DataTable
                rows={users}
                search_visible={true}
                search_keys={search_keys}
                columns={USER_COLUMNS(this)}
                loading={user_api_loading}
                table_name='User Management'
                headerJSX={this._renderHeader.call(this)}
            />
        );
    }

    onEditClick(user) {
        this.setState({
            drawer_title: 'Update User',
            drawer_visible: true,
            drawer_action: 'editing',
            drawer_user: user,
        });
    }

    onRemoveClick(user) {
        const { removeUser } = this.props;

        this.setState({ user_api_loading: true }, () => {
            removeUser(user)
            .then(() => this.setState({ user_api_loading: false }));
        });
    }

    _renderHeader() {
        return (
            <div className="col-md-6">
                <div className="pull-right">

                    <Button type="primary" onClick={() => {
                        this.setState({
                            drawer_title: 'Add User',
                            drawer_visible: true,
                            drawer_action: 'adding',
                            drawer_user: undefined,
                        });
                    }}>Add User</Button>
                
                </div>
            </div>
        );
    }

    componentDidMount() {
        const { getUsers } = this.props;

        this.setState({ user_api_loading: true }, () => {
            getUsers()
            .then(() => {
                this.setState({ user_api_loading: false });
            });
        });
    }

}

const mapStateToProps = ({ user, auth, }) => {
    const { users } = user;
    const { logged_in_user, } = auth;

    return {
        users,
        logged_in_user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUsers,
        removeUser,
        showErrorNotification,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTable);