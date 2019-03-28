
import jwt from 'express-jwt';
import { Request } from 'express';

const { JWT_SECRET, JWT_HEADER } = process.env;

const getToken = (req: Request) => {
    if (req.headers[JWT_HEADER])
        return req.headers[JWT_HEADER];
    else return undefined;
};

const middleware = jwt({
    secret: JWT_SECRET,
    credentialsRequired: true,
    getToken
});

export {
    middleware as jwtHandler,
};