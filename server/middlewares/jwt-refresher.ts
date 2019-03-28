
import jwt from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import { JWTRequest, } from 'Interfaces';
import { userCtrl } from '../controllers';

import * as utils from '../utils/utils';
import { IUserModel } from 'Models';


const jwtRefresher = (req: JWTRequest, res: Response, next: NextFunction) => {
    const _json = res.json;

    // @ts-ignore
    res.json = (data: object) => {
        const { email } = req.user;

        userCtrl.findUser(email)
        // @ts-ignore
        .then((user: IUserModel) => {
            if (!user)
                return next({ message: `Invalid User, please login again!` });

            return utils.generateUserJWToken(user);
        })
        .then((token: string) => {
            const interceptedData = {
                ...data,
                meta: {
                    token
                }
            };

            _json.call(res, interceptedData);
        });
    };

    next();
};


export default jwtRefresher;