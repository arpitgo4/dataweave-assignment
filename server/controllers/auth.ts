import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';

import sendGrid from '../utils/sendgrid';
import * as constants from '../utils/constants';
import * as utils from '../utils/utils';

import { userCtrl } from './index';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

import { User } from '../models';

import uuid from 'node-uuid';
import { IUserModel } from 'Models';
import { CustomError } from 'Interfaces';

export const sendVerificationEmail = (email: string): Promise<IUserModel> => {
    const email_verification_uuid = uuid.v4();
    const verification_url = constants.EMAIL_VERIFICATION_URL(email_verification_uuid, email);

    return sendGrid.sendEmailVerificationMail(email, verification_url)
    .then(() => userCtrl.findUser(email))
    .catch((err: CustomError) => {
        if (err.message === `user does not exists`)
            return Promise.resolve(undefined);

        return Promise.reject(err);
    })
    .then((user: IUserModel) => {
        if (user)
            return User.update(
                { emailVerificationUUID: email_verification_uuid },
                { where: { username: email } }
            )
            .then(() => userCtrl.findUser(email));

        return User.create({
            username: email,
            emailVerificationUUID: email_verification_uuid
        });
    });
};

export const verifyEmailUUID = (email: string, uuid_token: string): Promise<IUserModel> => {
    return userCtrl
    .findUser(email)
    .then((user: IUserModel) => {
        if (!user) return Promise.reject({ message: `${email} does not exists` });

        const { emailVerificationUUID } = user;

        if (emailVerificationUUID !== uuid_token) return Promise.reject({ message: `Email token is invalid` });

        return User.update(
            {
                isVerifiedEmail: true
            },
            {
                where: { username: email }
            }
        );
    })
    .then(() => userCtrl.findUser(email));
};

export const sendMobileVerificationOTP = (email: string, mobile_number: string): Promise<IUserModel> => {
    return userCtrl
    .findUser(email)
    .then((user: IUserModel) => {
        const otp = utils.generateOTP();

        return Promise.all([
            utils.sendOTP(otp, mobile_number),
            User.update({ mobileVerificationUUID: `${otp}` }, { where: { username: email } })
        ]);
    })
    .then(([ response, update_user ]) => userCtrl.findUser(email));
};

export const verifyMobileOTP = (email: string, otp: string): Promise<IUserModel> => {
    return userCtrl
    .findUser(email)
    .then((user: IUserModel) => {
        if (user.mobileVerificationUUID !== otp) return Promise.reject({ message: `OTP is invalue` });

        return User.update({ isVerifiedMobile: true }, { where: { username: email } });
    })
    .then(() => userCtrl.findUser(email));
};

export const getUserByAuth = (email: string, password: string): Promise<IUserModel> => {
    return (
    userCtrl
        .findUser(email)
        .then((user: IUserModel) => Promise.all([ utils.comparePassword(password, user.password), user ]))
        // @ts-ignore
        .then(([ passwordMatched, user ]: [boolean, IUserModel]) => {
            if (!passwordMatched) return Promise.reject({ message: `Username/Password may be wrong` });

            return user;
        })
    );
};

export const sendPasswordResetEmail = (email: string): Promise<IUserModel> => {
    const password_uuid = uuid.v4();
    const reset_url = constants.PASSWORD_RESET_URL(password_uuid, email);

    return sendGrid
    .sendPasswordResetVerificationMail(email, reset_url)
    .then(() => {
        return User.update({ forgotPasswordUUID: password_uuid }, { where: { username: email } });
    })
    .then(() => userCtrl.findUser(email));
};

export const resetPassword = (email: string, new_password: string, password_uuid: string): Promise<IUserModel> => {
    return userCtrl
    .findUser(email)
    .then((user: IUserModel) => {
        if (user.forgotPasswordUUID !== password_uuid)
            return Promise.reject({ message: `Invalid password reset link` });

        return utils.generateHash(new_password);
    })
    .then((hashed_password: string) => {
        return User.update(
            {
                password: hashed_password,
                forgotPasswordUUID: null
            },
            { where: { username: email } }
        );
    })
    .then(() => userCtrl.findUser(email));
};
