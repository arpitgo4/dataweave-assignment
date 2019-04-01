
import React, { Component } from 'react';
import { Pagination } from 'antd';

import ProductTileUI from './ProductTileUI';


class ProductLayout extends Component {

    render() {
        const { products, total_product_count, } = this.props;
        const { onPageChange, } = this.props;

        return (
            <div>
                <h1>Products</h1>

                <div style={{  }}>
                    {products.length === 0 ? <h2>No Products Found!</h2> : (products.map(p => (
                        <ProductTileUI product={p} key={p.urlh} />
                    )))}
                </div>

                <div style={{ display: 'inline-block', position: 'relative', left: '40%', margin: '40px auto', }}>
                    <Pagination
                        onChange={onPageChange}
                        defaultCurrent={1} 
                        total={total_product_count} />
                </div>
            </div>
        );
    }
}



export default ProductLayout;