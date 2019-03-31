
import React, { Component } from 'react';


const PRODUCT_PLACEHOLDER_IMG = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI5BTayt_O7k3zN2bLeyaOUbnannfd71RKB25ObPKCNu1ETezk`;

const ProductTileUI = ({
    product,
}) => (
    <div style={{ display: "inline-block",  margin: 15, }}>

        <div id="container" style={{ border: '1px solid grey', width: 300, padding: 20, height: 600, overflow: 'auto' }}>
            <div id="head-image">
                <img src={PRODUCT_PLACEHOLDER_IMG} />
            </div>

            <div id="content-body" style={{ fontWeight: 'bolder' }}>
                <p>{product.title}</p>
                <p>Brand: {product.brand}</p>
                <p>Seller: {product.source}</p>
                <p>MRP: {product.mrp}</p>
                <p>Discount: {product.discount}</p>
                <p>Available Price: {product.available_price}</p>
                <p>Availability: {product.stock}</p>
                <a target="_blank" href={product.url}>Seller's Link</a>
            </div>
        </div>
    </div>
)


export default ProductTileUI;