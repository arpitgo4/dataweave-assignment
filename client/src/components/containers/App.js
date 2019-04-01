
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import HeaderUI from '../Header/Header';
import styles from './App.style.css';
import ProductLayout from '../Product/ProductLayout';

import { productActionCreators, } from '../../action-creators/index.action-creator';

import { DEFAULT_PAGE_SIZE, } from '../../config/constants';

import { Layout, Button, Input, Radio, Slider, Select, } from 'antd';

const { Group: RadioGroup, } = Radio; 
const { Option, } = Select;
const { Content, Sider, } = Layout;

class App extends Component {

    state = {
        filters: {
            offset: 0,
            limit: DEFAULT_PAGE_SIZE,
            title: '',
            sku: '',
            brand: '',
            category: '',
            subcategory: '',
            source: '',
            price_range: [100, 100000],
            stock_status: 'In Stock',
        },
    };

    render() {
        const { total_product_count, products, } = this.props;
       
        return (
            <Layout>
                <Sider width={300} style={{ margin: '24px 0', marginLeft: 12, padding: 24, background: '#fff' }}>
                    {this._renderFilterPanel.call(this)}
                </Sider>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <ProductLayout
                        products={products}
                        total_product_count={total_product_count} 
                        onPageChange={this.onPageChange.bind(this)} />
                </Content>
            </Layout>
        );
    }

    _renderFilterPanel() {
        const { category, brand, source, subcategory, } = this.props;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div>
                <h2>Filter Panel</h2>

                <div style={{ margin: '10px 0' }}>
                    <h3>Search:</h3>
                    <Input 
                        ref="title"
                        placeholder="%Title%" 
                        onChange={(f_n => e => this._searchInputChange.bind(this)(e, f_n))('title')} 
                        style={{ margin: '10px 0' }} />
                    <Input 
                        ref="sku"
                        placeholder="%SKU%"
                        onChange={(f_n => e => this._searchInputChange.bind(this)(e, f_n))('sku')}  />
                </div>

                <div>
                    <h3>Filters:</h3>
                    <div>
                        <h4>Category:</h4>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(f_n => v => this._onSelectChange(v, f_n))('category')}
                            value={this.state.filters.category}>
                            <Option value={''}>All</Option>
                            {category.map(c => (
                                <Option key={getRandomKey()} value={c}>{c}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <h4>Brand:</h4>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(f_n => v => this._onSelectChange(v, f_n))('brand')}
                            value={this.state.filters.brand}>
                            <Option value={''}>All</Option>
                            {brand.map(c => (
                                <Option key={getRandomKey()} value={c}>{c}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <h4>Source:</h4>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(f_n => v => this._onSelectChange(v, f_n))('source')}
                            value={this.state.filters.source}>
                            <Option value={''}>All</Option>
                            {source.map(c => (
                                <Option key={getRandomKey()} value={c}>{c}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <h4>Sub-Category:</h4>
                        <Select
                            style={{ width: '100%' }}
                            onChange={(f_n => v => this._onSelectChange(v, f_n))('subcategory')}
                            value={this.state.filters.subcategory}>
                            <Option value={''}>All</Option>
                            {subcategory.map(c => (
                                <Option key={getRandomKey()} value={c}>{c}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <h4>Price Range:</h4>
                        <Slider 
                            max={10000} min={0}
                            range step={10} defaultValue={this.state.filters.price_range} 
                            onChange={(f_n => e => this._searchInputChange(e, f_n))('price_range')} 
                            onAfterChange={() => {}} />
                    </div>

                    <div>
                        <h4>Stock Status:</h4>
                        <RadioGroup
                            onChange={(f_n => e => this._onRadioChange.bind(this)(e, f_n))('stock_status')} 
                            value={this.state.filters.stock_status}>
                            <Radio style={radioStyle} value={'In Stock'}>In Stock</Radio>
                            <Radio style={radioStyle} value={'Out Of Stock'}>Out Of Stock</Radio>
                        </RadioGroup>
                    </div>
                </div>

                <Button style={{ float: 'right' }} 
                    type="primary" 
                    onClick={this.onButtonClick.bind(this)}>
                    Apply
                </Button>
            </div>
        );
    }

    _searchInputChange(e, field_name) {
        if (field_name === 'price_range') {
            this.setState({filters: {
                ...this.state.filters,
                [field_name]: e,
            }});
        }
        else {
            this.setState({ filters: {
                ...this.state.filters,
                [field_name]: e.target.value },
            });
        }
    }

    _onSelectChange(value, field_name) {
        this.setState({ filters: {
            ...this.state.filters,   
            [field_name]: value,       
        }});
    }

    _onRadioChange(e, field_name) {
        this.setState({ filters: {
            ...this.state.filters,
            [field_name]: e.target.value },
        });
    }

    onButtonClick() {
        this._getProducts();
    }

    _getProducts() {
        const { filters } = this.state;
        const { getProducts, } = this.props;

        const { offset, limit, title, sku, category, brand, source, subcategory, price_range, stock_status, } = filters;
        getProducts(
            offset, 
            limit, 
            title, 
            sku, 
            category, 
            brand, 
            source, subcategory, 
            price_range ? price_range.map(String).join('-'): '', 
            stock_status
        );
    }

    componentDidMount() {
        const { getProducts, getDistinctOptions, } = this.props;

        getProducts(0, DEFAULT_PAGE_SIZE);
        getDistinctOptions('brand');
        getDistinctOptions('category');
        getDistinctOptions('subcategory');
        getDistinctOptions('source');
    }

    onPageChange(page, pageSize) {
        const { getProducts, } = this.props;
        
        const offset = page - 1;
        this.setState({ filters: 
            { ...this.state.filters, offset, limit: DEFAULT_PAGE_SIZE }
        }, () => {
            this._getProducts();
        });
    }

};


const mapStateToProps = ({ products, misc, }, ownProps) => {
    const { total_product_count, brand, source, category, subcategory, } = misc;

    return {
        products,
        total_product_count,
        brand,
        source,
        category,
        subcategory,
    };
};


const mapDispatchToProps = dispatch => {
    const { getProducts, getDistinctOptions, } = productActionCreators;

    return bindActionCreators({
        getProducts,
        getDistinctOptions,
    }, dispatch);
};


const getRandomKey = () => Math.random() * 1e8;

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles));