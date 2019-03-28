
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import chalk from 'chalk';
import bcrypt from 'bcryptjs';

import * as controllers from '../controllers/index';
import { IUserModel } from 'Models';
import { USER_JWT_TOKEN_TTL } from './constants';
const { AUTH, } = process.env;


import { promisify } from 'util';
import request, { Request, Response } from 'request';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

const UUIDv4_REG_EXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const isValidUUIDv4 = (uuidStr: string) => UUIDv4_REG_EXP.test(uuidStr);

export const getUnixTimeStamp = () => Math.floor(new Date().getTime() / 1000);

const SALT_ROUNDS = 13;

/**
 * $2y$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |                     |
 * |  |  |                     hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |
 * |  |  salt = nOUIs5kJ7naTuTFkBy1veu
 * |  |
 * |  cost-factor = 10 = 2^10 iterations
 * |
 * hash-algorithm = 2y = BCrypt
 */
export const generateHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
    .catch(err => {
        console.log(`[generateHash] Error generating the hash of: ${password}`);
        return Promise.reject(err);
    });
};

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
    .catch(err => {
        console.log('error', err);
        console.log(`[comparePassword] Error comparing the passwords: ${password}, hash: ${hashedPassword}`);
        return Promise.reject(err);
    });
};

export const generateUserJWToken = (user: IUserModel, expireTime: string = USER_JWT_TOKEN_TTL): Promise<string> => {
    const { JWT_SECRET, } = process.env;

    const token_payload: any = { email: user.username, id: user.id };

    const options = {
        expiresIn: expireTime
    };

    return Promise.resolve(jsonWebToken.sign(token_payload, JWT_SECRET, options));
};


export const generateOTP = (otp_length: number = 4): number => {
    let counter: number = 0;
    let result: number = 0;

    while (counter++ < otp_length) {
        const randDigit: number = Math.floor(Math.random() * 10);
        if (randDigit == 0)
            result = result * 10 + 1;
        else result = result * 10 + randDigit;
    }

    return result;
};


export function sendOTP(otp, mobile_number) {

    const options = {
        method: 'POST',
        hostname: 'http://2factor.in',
        port: null,
        path: `/API/V1/${AUTH}/SMS/${mobile_number}/${otp}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    };

    return request_post({
        url: `${options.hostname}${options.path}`,
        method: options.method,
        headers: options.headers,
    }, undefined);
}


export const generateApiKey = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(22, (err, buf) => {
            if (err) return reject(err);
            const key = buf.toString('hex');

            return resolve(key);
        });
    });
};

function test() {

}
