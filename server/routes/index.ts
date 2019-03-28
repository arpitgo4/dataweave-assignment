
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

import authRouter from './auth';
import userRouter from './user';
import msgRouter from './message';
import groupRouter from './group';
import integrationRouter from './integration';


export {
    authRouter,
    userRouter,
    msgRouter,
    groupRouter,
    integrationRouter,
};
