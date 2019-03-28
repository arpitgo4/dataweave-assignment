
import { Request } from 'express';
import { IUserModel } from 'Models';

declare module '*.png' {
    const value: string;
    export default value;
}

export interface CustomError extends Error {
    err: string;
    message: string;
}

export interface JWTRequest extends Request {
    user: {
        email: string;
        id: number;
    };
}