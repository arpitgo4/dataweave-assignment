

import { Router, NextFunction, Response, } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { authCtrl, userCtrl, } from '../controllers';
import { IUserModel } from 'Models';

import * as utils from '../utils/utils';


const router = Router();

router.post('/verification-mail', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, } = req.body.data.attributes;

    authCtrl.sendVerificationEmail(email)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.put('/verification-mail', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, uuid_token, } = req.body.data.attributes;

    authCtrl.verifyEmailUUID(email, uuid_token)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/verification-otp', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, mobile_number } = req.body.data.attributes;

    authCtrl.sendMobileVerificationOTP(email, mobile_number)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.put('/verification-otp', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, otp } = req.body.data.attributes;

    authCtrl.verifyMobileOTP(email, otp)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.post('/user', (req: JWTRequest, res: Response, next: NextFunction) => {
    const user_data = req.body.data.attributes;

    userCtrl.createUser(user_data)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.post('/token', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, password, } = req.body.data.attributes;
    let _user_: IUserModel = undefined;

    authCtrl.getUserByAuth(email, password)
    .then((user: IUserModel) => {
        _user_ = user;

        return utils.generateUserJWToken(user);
    })
    .then((token: string) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: _user_.username,
                attributes: _user_,
            },
            meta: {
                token
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.post('/reset-password', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email, } = req.body.data.attributes;

    authCtrl.sendPasswordResetEmail(email)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.put('/reset-password', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { password, password_uuid, email, } = req.body.data.attributes;

    authCtrl.resetPassword(email, password, password_uuid)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

export default router;