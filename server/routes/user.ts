

import { Router, NextFunction, Response } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { userCtrl, } from '../controllers';
import { IUserModel, IAddressModel, IApiKeyModel, IApiKeyIpModel } from 'Models';


const router = Router();


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { email } = req.user;

    userCtrl.findUser(email)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: user,
                id: user.username,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.put('/delivery-url', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { delivery_url } = req.body.data.attributes;

    userCtrl.updateUserDeliveryUrl(user_id, delivery_url)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.id,
                attributes: user,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.get('/address', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id } = req.user;

    return userCtrl.getUserAddress(id)
    .then((address: IAddressModel) => {
        res.status(200).json({
            data: {
                type: 'address',
                id: address.id,
                attributes: address,
            }
        });
    })
    .catch((err: CustomError) => next(err));

});


router.get('/api-key', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;

    return userCtrl.getApiKeys(user_id)
    .then((api_keys: Array<IApiKeyModel>) => {
        res.status(200).json({
            data: api_keys.map(key => {
                return {
                    type: 'api_key',
                    id: key.id,
                    attributes: key,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/api-key', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;

    return userCtrl.createApiKey(user_id)
    .then((api_key: IApiKeyModel) => {
        res.status(200).json({
            data: {
                type: 'api_key',
                id: api_key.id,
                attributes: api_key,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.put('/api-key', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { api_key, active, } = req.body.data.attributes;

    return userCtrl.updateApiKey(user_id, api_key, active)
    .then((api_keys: Array<IApiKeyModel>) => {
        res.status(200).json({
            data: api_keys.map(key => {
                return {
                    type: 'api_key',
                    id: key.id,
                    attributes: key,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});


router.delete('/api-key', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { api_key, } = req.body.data.attributes;

    return userCtrl.deleteApiKey(user_id, api_key)
    .then((api_key: IApiKeyModel) => {
        res.status(200).json({
            data: {
                type: 'api_key',
                id: api_key.id,
                attributes: api_key,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

router.get('/api-key/ip/:api_key_id', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { api_key_id, } = req.params;

    return userCtrl.getIpAddressesForApiKey(user_id, api_key_id)
    .then((api_key_ips: Array<IApiKeyIpModel>) => {
        res.status(200).json({
            data: api_key_ips.map(ip => {
                return {
                    type: 'ip_address',
                    id: ip.id,
                    attributes: ip,
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/api-key/ip', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { api_key_id, ip_address } = req.body.data.attributes;

    return userCtrl.addIpAddressToApiKeyWhitelist(user_id, api_key_id, ip_address)
    .then((ip: IApiKeyIpModel) => {
        res.status(200).json({
            type: 'ip_address',
            id: ip.id,
            attributes: ip,
        });
    })
    .catch((err: CustomError) => next(err));
});

router.delete('/api-key/ip', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { api_key_id, ip_address, } = req.body.data.attributes;

    return userCtrl.removeIpAddressForApiKeyWhitelist(user_id, api_key_id, ip_address)
    .then((ip: IApiKeyIpModel) => {
        res.status(200).json({
            type: 'ip_address',
            id: ip.id,
            attributes: ip,
        });
    })
    .catch((err: CustomError) => next(err));
});

export default router;
