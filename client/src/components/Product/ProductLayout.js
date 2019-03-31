
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';

import ProductTileUI from './ProductTileUI';
import { productActionCreators, } from '../../action-creators/index.action-creator';

import { DEFAULT_PAGE_SIZE, } from '../../config/constants';


class ProductLayout extends Component {

    render() {
        const { products, total_product_count, } = this.props;

        return (
            <div>
                <h1>Products</h1>

                <div style={{  }}>
                    {products.map(p => (
                        <ProductTileUI product={p} key={p.urlh} />
                    ))}
                </div>


                <div style={{ display: 'inline-block', position: 'relative', left: '40%', margin: '40px auto', }}>
                    <Pagination
                        onChange={this.onChange.bind(this)}
                        defaultCurrent={1} 
                        total={total_product_count} />
                </div>
            </div>
        );
    }

    onChange(page, pageSize) {
        const { getProducts, } = this.props;
        
        const offset = page - 1;
        getProducts(offset, DEFAULT_PAGE_SIZE);
    }

    componentDidMount() {
        const { getProducts, } = this.props;

        getProducts(0, DEFAULT_PAGE_SIZE);
    }

}

const mapStateToProps = ({ products, misc, }, ownProps) => {
    const { total_product_count, } = misc;

    return {
        products,
        total_product_count,
    };
};


const mapDispatchToProps = dispatch => {
    const { getProducts, } = productActionCreators;

    return bindActionCreators({
        getProducts,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductLayout);