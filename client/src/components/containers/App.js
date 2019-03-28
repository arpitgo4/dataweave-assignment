
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import HeaderUI from '../Header/Header';
import styles from './App.style.css';

import { deleteJWToken, deleteAllState, } from '../../action-creators/auth';

import { removeTokenFromLS, removeUserFromLS } from '../../config/local-storage';
import { USER_ROLES, ROUTES, } from '../../config/constants';

import { Layout, Icon, } from 'antd';

const { Header, Content } = Layout;

class App extends Component {

    componentWillMount() {
        const { token, logged_in_user } = this.props;

        if (!token) {
            browserHistory.replace('/');
            return;
        }

        const { role } = logged_in_user;
        if (role === USER_ROLES.ADMIN)
            browserHistory.replace(ROUTES.USER_MANAGEMENT_LAYOUT);
        else 
            browserHistory.replace(ROUTES.INSPECTION_LAYOUT);
    }

    render() {
        const { children, } = this.props;
        
        return (
            <Layout>
                <HeaderUI />
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <div style={{ marginRight: 20 }}
                        styleName="logout-wrapper"
                        onClick={this.logoutHandler.bind(this)}
                        className="pull-right" >
                        <Icon type="logout" />
                        <span>
                            {'  '} Logout
                        </span>
                    </div>

                    {children}
                </Content>
            </Layout>
        );
    }

    logoutHandler() {
        const { deleteJWToken, deleteAllState, } = this.props;

        // deleteJWToken();
        removeTokenFromLS();
        removeUserFromLS();
        deleteAllState();
        browserHistory.replace('/');
    }

    componentDidMount() {
    }

};

const mapStateToProps = (state, ownProps) => {
    const { logged_in_user, token } = state.auth;

    return {
        logged_in_user,
        token
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteJWToken,
        deleteAllState,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));