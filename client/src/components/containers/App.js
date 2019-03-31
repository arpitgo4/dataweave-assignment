
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import HeaderUI from '../Header/Header';
import styles from './App.style.css';
import ProductLayout from '../Product/ProductLayout';

import { Layout, Icon, } from 'antd';

const { Header, Content } = Layout;

class App extends Component {

    componentWillMount() {
       
    }

    render() {
        const {} = this.props;
        
        return (
            <Layout>
                <HeaderUI />
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    
                    <ProductLayout />
                    
                </Content>
            </Layout>
        );
    }

    logoutHandler() {
       
    }

};

const mapStateToProps = ({}, ownProps) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));