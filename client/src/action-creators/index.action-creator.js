
import { error, success } from 'react-notification-system-redux';

import * as inspectionActionCreators from './inspection';
import * as userActionCreators from './user';
import * as authActionCreators from './auth';
import * as miscActionCreators from './misc';


export const showErrorNotification = message => {
    const notification = {
        uid: require('uuid').v4(), 
        title: 'Error',
        message: message,
        position: 'tr',
        autoDismiss: 0
    };

    return error(notification);
};

export {
    authActionCreators,
    inspectionActionCreators,
    userActionCreators,
    miscActionCreators,
};