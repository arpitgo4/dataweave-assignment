
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import { errorHandler } from './middlewares';

import {
    productRouter,
} from './routes';

import {
    loggerMiddleware,
} from './middlewares';

const app = express();

app.set('json spaces', 4);
app.disable('etag');
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json({ limit: '50mb', extended: false, type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

app.get('/api/v1/health', (_, res) => res.status(200).json({ message: 'Greetings from Docker-Compose!' }));
app.use('/api/v1/product', productRouter);


app.use(loggerMiddleware);
app.use(errorHandler);


module.exports = app;
