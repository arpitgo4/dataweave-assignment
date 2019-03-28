
import Sequelize from 'sequelize';
import sequelize_connection from '../config/mysql';

import uuid from 'node-uuid';


const User = sequelize_connection.define('user', {
    id: { type: Sequelize.BIGINT(20), allowNull: false, primaryKey: true, autoIncrement: true },
    accountExpired: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 0, },
    accountLocked: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 0, },
    agencyName: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    dateCreated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    deliveryUrl: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    emailVerificationUUID: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    firstName: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    forgotPasswordUUID: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 0, },
    isEnabled: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 1, },
    isVerifiedEmail: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 0, },
    isVerifiedMobile: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: 0, },
    lastModified: { type: Sequelize.DATE, allowNull: true, defaultValue: null, },
    lastName: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    mobile: { type: Sequelize.STRING, allowNull: true, },
    mobileVerificationUUID: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    password: { type: Sequelize.STRING, allowNull: true, },
    timezone: { type: Sequelize.STRING, allowNull: true, defaultValue: null, },
    userId: { type: Sequelize.STRING, allowNull: true, defaultValue: uuid.v4, },
    username: { type: Sequelize.STRING, allowNull: true, },
    version: { type: Sequelize.BIGINT(20), allowNull: false, defaultValue: 1, },
}, { freezeTableName: true , timestamps: false, });


export {
    User,
};