
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import HeaderUI from '../Header/Header';
import styles from './App.style.css';

import { productActionCreators, } from '../../action-creators/index.action-creator';

import { Layout, Icon, } from 'antd';

const { Header, Content } = Layout;

class App extends Component {

    componentWillMount() {
       
    }

    render() {
        const { children, products, } = this.props;
        
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
       
    }

    componentDidMount() {
        const { getProducts, } = this.props;

        getProducts();
    }

};

const mapStateToProps = ({ products, }, ownProps) => {
    return {
        products,
    };
};

const mapDispatchToProps = (dispatch) => {
    const { getProducts, } = productActionCreators;

    return bindActionCreators({
        getProducts,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));