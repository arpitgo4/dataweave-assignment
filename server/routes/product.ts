

import { Router, NextFunction, Response } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { productCtrl, } from '../controllers';
import { IProductModel, } from 'Models';


const router = Router();


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { title, sku, category, brand, source, subcategory, price_range, stock_status, offset, limit, } = req.query;

    productCtrl.getAllProducts(Number(offset), Number(limit), title, sku, category, brand, source, subcategory, price_range, stock_status)
    .then((result: any) => {
        const { products, count, } = result;

        res.status(200).json({
            data: products.map(product => {
                return {
                    type: 'product',
                    id: product.urlh,
                    attributes: product,
                };
            }),
            meta: {
                total_product_count: count
            },
        });
    })
    .catch((err: CustomError) => next(err));
});


export default router;
