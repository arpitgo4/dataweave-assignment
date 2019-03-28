
import { Request, Response, NextFunction } from 'express';

import {  userCtrl, } from '../controllers';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { api_key } = req.body.data.attributes;

    userCtrl.isApiKeyValid(api_key)
    .then((is_valid: boolean) => {
        if (is_valid)
            return next();

        return next({ message: `invalid api key` });
    });
};

export default apiKeyMiddleware;
