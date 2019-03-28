
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';
import Sequelize from 'sequelize';

import {
    Product,
} from '../models';

import { IProductModel, } from 'Models';

import * as utils from '../utils/utils';


export const getAllProducts = (offset: number, limit: number, title?: string, sku?: string, category?: string,
            brand?: string, source?: string, subcategory?: string,
            price_range?: string, stock_status?: string): Promise<Array<IProductModel>> => {

    if (!limit)
        return Promise.reject({ message: `provide limit value to fetch product dataset` });
    if (price_range) {
        const prices = price_range.split('-');
        if (prices.length !== 2 || prices.some(p => p !== '' && Number(p) === NaN))
            return Promise.reject({ message: `price range format is invalid` });
    }

    const query: any = { where: {}, offset: (offset || 0), limit };

    if (title)
        query.where.title = { [Sequelize.Op.like]: `${title}` };
    if (sku)
        query.where.sku = { [Sequelize.Op.like]: `${sku}` };
    if (category)
        query.where.category = category;
    if (brand)
        query.where.brand = brand;
    if (source)
        query.where.source = source;
    if (subcategory)
        query.where.subcategory = subcategory;
    if (price_range)
        query.where.mrp = { [Sequelize.Op.between]: price_range.split('-').map(Number) };
    if (stock_status)
        query.where.stock = stock_status;

    console.log('[GET /product] query:', query);

    return Product.findAll(query)
    .then((products: Array<IProductModel>) => {
        if (!products)
            return [];

        return products;
    });
};