
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';
import Sequelize from 'sequelize';

import {
    User,
    Address,
    User_Address,
    Api_Key,
    sequelize,
    Ip_Api_Key,
} from '../models';
import { IUserModel, IAddressModel, IUser_AddressModel, IApiKeyModel, IApiKeyIpModel } from 'Models';

import * as utils from '../utils/utils';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];


export const findUser = (email: string): Promise<IUserModel> => {
    return User.findOne({ where: { username: email } })
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `user does not exists` });

        return user;
    });
};

export const findUserById = (user_id: number): Promise<IUserModel> => {
    return User.findOne({ where: { id: user_id } })
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `user does not exists` });

        return user;
    });
};

export const createUser = (user_data: any): Promise<IUserModel> => {
    const address = {
        address1: user_data.address1,
        address2: user_data.address2,
        city: user_data.city,
        country: user_data.country,
        postalCode: user_data.postal_code,
        state: user_data.state,
        street: user_data.street,
    };

    const user = {
        firstName: user_data.first_name,
        lastName: user_data.last_name,
        password: user_data.password,
        timezone: user_data.timezone,
        usename: user_data.email,
        mobile: user_data.mobile_number,
        agencyName: user_data.agency_name,
    };

    return findUser(user.usename)
    .then((user_model: IUserModel) => {
        if (!user_model.isVerifiedEmail)
            return Promise.reject({ message: `${user.usename} email id not verified` });

        if (!user_model.isVerifiedMobile)
            return Promise.reject({ message: `${user.usename} mobile number not verified` });

        return Promise.all([
            Address.create(address),
            user_model,
            utils.generateHash(user.password)
        ]);
    })
    .then(([ address, user_model, hashed_password ]: [ IAddressModel, IUserModel, string ]) => {
        const user_address_promise = User_Address.create({
            FK_userId: user_model.id,
            FK_addressId: address.id
        });

        user.password = hashed_password;
        const update_user_promise = User.update(user, { where: { username: user_data.email } });

        return Promise.all([
            user_address_promise,
            update_user_promise,
        ]);
    })
    .then(([ user_address, update ]: [ IUser_AddressModel, object ]) => findUser(user_data.email));
};

export const updateUserDeliveryUrl = (user_id: number, delivery_url: string): Promise<IUserModel> => {
    return User.update({ deliveryUrl: delivery_url, }, { where: { id: user_id } })
    .then(() => findUserById(user_id));
};

export const getUserAddress = (id: number): Promise<IAddressModel> => {
    const query = `SELECT * FROM address LEFT JOIN user_address ON address.id=user_address.FK_addressId where user_address.FK_userId = ${id};`;

    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then((addresses: Array<IAddressModel>) => {
        const [ first, ...rest ] = addresses;

        return first;
    });
};

export const getApiKeys = (user_id: number) => {
    return Api_Key.findAll({ where: { FK_userId: user_id } })
    .then((api_keys: Array<IApiKeyModel>) => {
        if (!api_keys)
            return [];

        return api_keys;
    });
};

export const createApiKey = (user_id: number) => {
    return utils.generateApiKey()
    .then((api_key: string) => Api_Key.create({ FK_userId: user_id, api_key }));
};


export const updateApiKey = (user_id: number, api_key: string, active: boolean) => {
    const { notIn } = Sequelize.Op;

    return Api_Key.findOne({ where: { api_key, FK_userId: user_id } })
    .then((api_key_model: IApiKeyModel) => {
        if (!api_key_model)
            return Promise.reject({ message: `api key not found` });

        return Api_Key.update({ active, }, { where: { FK_userId: user_id, api_key } });
    })
    .then(() => Api_Key.update({ active: false }, { where: { FK_userId: user_id, api_key: { [notIn]: [ api_key ] } } }))
    .then(() => getApiKeys(user_id));
};

export const deleteApiKey = (user_id: number, api_key: string) => {
    return Api_Key.findOne({ where: { FK_userId: user_id, api_key } })
    .then((api_key_model: IApiKeyModel) => {
        return Api_Key.destroy({ where: { FK_userId: user_id, api_key } })
        .then(() => api_key_model);
    });
};

export const getIpAddressesForApiKey = (user_id: number, api_key_id: number) => {
    return Ip_Api_Key.findAll({
        where: {
            FK_userId: user_id,
            api_key_id: api_key_id,
        }
    })
    .then((api_key_ips: Array<IApiKeyIpModel>) => {
        if (!api_key_ips)
            return [];

        return api_key_ips;
    });
};

export const addIpAddressToApiKeyWhitelist = (user_id: number, api_key_id: number, ip_address: string) => {
    api_key_id = Number(api_key_id);
    return Ip_Api_Key.create({ FK_userId: user_id, api_key_id, ip_address });
};

export const removeIpAddressForApiKeyWhitelist = (user_id: number, api_key_id: number, ip_address: string) => {
    api_key_id = Number(api_key_id);
    return Ip_Api_Key.findOne({ where: { FK_userId: user_id, ip_address, api_key_id } })
    .then((ip_api_key: IApiKeyIpModel) => {
        return Ip_Api_Key.destroy({ where: { FK_userId: user_id, ip_address, api_key_id } })
        .then(() => ip_api_key);
    });
};


export const isApiKeyValid = (api_key: string): Promise<boolean> => {
    return Api_Key.findOne({ where: { api_key } })
    .then((api_key: IApiKeyModel) => !!api_key);
};
